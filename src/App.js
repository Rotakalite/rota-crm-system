import React, { useState, useEffect } from 'react';
import './App.css';
import { Header, LoginForm, Dashboard, DocumentUpload } from './components';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check localStorage)
    const savedUser = localStorage.getItem('rotaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('rotaUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rotaUser');
    setCurrentPage('dashboard');
  };

  const handleDocumentUpload = (files) => {
    // Update user documents
    const updatedUser = {
      ...user,
      documents: [...(user.documents || []), ...files.map(file => ({
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        status: 'uploaded'
      }))]
    };
    setUser(updatedUser);
    localStorage.setItem('rotaUser', JSON.stringify(updatedUser));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                currentPage === 'dashboard'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                currentPage === 'documents'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Belge Yükleme
            </button>
            <button
              onClick={() => setCurrentPage('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                currentPage === 'reports'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Raporlarım
            </button>
            <button
              onClick={() => setCurrentPage('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                currentPage === 'messages'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mesajlar
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="min-h-screen">
        {currentPage === 'dashboard' && <Dashboard user={user} />}
        {currentPage === 'documents' && (
          <DocumentUpload user={user} onUpload={handleDocumentUpload} />
        )}
        {currentPage === 'reports' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Raporlarım</h2>
              <p className="text-gray-600">Size özel hazırlanan raporlar burada görüntülenecek.</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">Ön Değerlendirme Raporu</h3>
                  <p className="text-sm text-gray-500 mt-1">Durum: Hazırlanıyor</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">Süreç Analiz Raporu</h3>
                  <p className="text-sm text-gray-500 mt-1">Durum: Beklemede</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentPage === 'messages' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mesajlar</h2>
              <p className="text-gray-600">Danışmanlarınızla olan mesajlaşmalarınız burada görüntülenecek.</p>
              <button className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700">
                Yeni Mesaj Gönder
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;


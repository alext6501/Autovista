import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { AuthModal } from './components/common/AuthModal';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { BrandsPage } from './pages/BrandsPage';
import { ComparePage } from './pages/ComparePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderActiveRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'cars':
        return <BrowsePage key="cars" initialType="car" />;
      case 'motorcycles':
        return <BrowsePage key="motorcycles" initialType="motorcycle" />;
      case 'car-details':
      case 'motorcycle-details':
        return <VehicleDetailPage />;
      case 'brands':
        return <BrandsPage />;
      case 'compare':
        return <ComparePage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'search':
        return <SearchResultsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        {renderActiveRoute()}
      </main>
      <Footer />
      <Toast />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

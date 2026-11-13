import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { BrandsPage } from './pages/BrandsPage';
import { ComparePage } from './pages/ComparePage';
import { AboutPage } from './pages/AboutPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { ProfilePage } from './pages/ProfilePage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderActiveRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'all-cars':
        return <BrowsePage />;
      case 'brands':
        return <BrandsPage />;
      case 'compare':
        return <ComparePage />;
      case 'about':
        return <AboutPage />;
      case 'updates':
        return <UpdatesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'car-details':
        return <VehicleDetailPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">{renderActiveRoute()}</main>
      <Footer />
      <Toast />
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

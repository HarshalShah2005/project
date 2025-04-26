import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BackgroundCanvas from './three/BackgroundCanvas';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundCanvas />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
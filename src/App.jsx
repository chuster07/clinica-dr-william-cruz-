import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SkipToContent from './components/accessibility/SkipToContent';
import MetaTags from './components/seo/MetaTags';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Services from './pages/Services';
import Telemedicine from './pages/Telemedicine';
import PatientPortal from './pages/PatientPortal';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import { Privacy, Terms, Cookies } from './pages/Legal';
import ChatWidget from './components/chat/ChatWidget';
import WhatsAppButton from './components/social/WhatsAppButton';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === null ? true : stored === 'true';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <MetaTags />
      <SkipToContent />
      <div className="min-h-screen flex flex-col">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isAuthenticated={isAuthenticated}
        />

        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citas" element={<Appointments />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/telemedicina" element={<Telemedicine />} />
            <Route path="/portal-pacientes" element={<PatientPortal setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </main>

        <Footer />

        {/* Chat Widget flotante */}
        <ChatWidget />

        {/* WhatsApp Button */}
        <WhatsAppButton />

        {/* Notificaciones Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: darkMode ? '#1f2937' : '#fff',
              color: darkMode ? '#fff' : '#1f2937',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;

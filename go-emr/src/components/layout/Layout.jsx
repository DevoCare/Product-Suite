import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../App';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';
import logoImg from '/logo.png';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Security', path: '/security' },
  { name: 'Pricing', path: '/pricing' },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImg} style={{ width: '120px' }} alt="DevoCare Logo" />
            </Link>

            {/* Back to Website */}
            <div className="hidden lg:flex items-center ml-4">
              <a href="../index.html" className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors">
                <i className="pi pi-arrow-left"></i> Back to Website
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={location.pathname === item.path ? 'nav-link-active' : 'nav-link'}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-card transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link to="/" className="hidden sm:flex btn-primary">
                Get Started
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-card"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-surface border-t border-slate-100 dark:border-dark-border">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium ${location.pathname === item.path
                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-slate-600 dark:text-slate-300'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link to="/" className="btn-primary w-full justify-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-dark-surface border-t border-slate-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src={logoImg} style={{ width: '100px' }} alt="DevoCare Logo" />
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Modern EMR by DevoCare for healthcare providers.
              </p>
              <div className="flex gap-2">
                <span className="badge-success">HIPAA</span>
                <span className="badge-primary">SOC 2</span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Features</Link></li>
                <li><Link to="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Pricing</Link></li>
                <li><Link to="/security" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Security</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">About</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Contact</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Privacy</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-slate-200 dark:border-dark-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">
                © 2026 DevoCare Technologies. All rights reserved.
              </p>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                Inspired by{' '}
                <a href="https://www.open-emr.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  OpenEMR
                </a>
                {' '}• Designed and developed with Care <Heart className="w-4 h-4 text-red-500 inline" />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

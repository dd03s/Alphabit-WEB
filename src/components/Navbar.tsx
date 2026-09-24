import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="section-container flex items-center justify-between">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink-900"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white text-sm">
              A
            </span>
            ALPHABIT
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contacto');
            }}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-all duration-300 group"
          >
            Iniciar Proyecto
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>

          <button
            className="md:hidden text-ink-900 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink-900/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`relative h-full flex flex-col items-center justify-center gap-7 transition-transform duration-400 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          <button
            className="absolute top-6 right-6 text-white p-2"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-display text-2xl font-semibold text-white hover:text-brand-400 transition-colors duration-300"
              style={{
                animation: mobileOpen
                  ? `fadeUp 0.35s ease-out ${i * 0.07}s both`
                  : undefined,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contacto');
            }}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white font-semibold text-sm"
          >
            Cotizar Proyecto →
          </a>
        </div>
      </div>
    </>
  );
}

import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-ink-900 py-16">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white text-sm">
                A
              </span>
              ALPHABIT
            </div>
            <p className="text-ink-400 text-sm font-light mt-3 max-w-xs">
              Estudio Creativo & Dirección de Arte — El Salvador
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {[
              { label: 'Inicio', href: '#inicio' },
              { label: 'Proyectos', href: '#proyectos' },
              { label: 'Servicios', href: '#servicios' },
              { label: 'Nosotros', href: '#nosotros' },
              { label: 'Contacto', href: '#contacto' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-400 hover:text-brand-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs font-light text-ink-500">
            © {new Date().getFullYear()} ALPHABIT. Todos los derechos reservados.
          </p>
          <p className="text-xs font-light text-ink-500">
            Diseño Gráfico, Identidad Visual & Producción Fotográfica
          </p>
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ink-400 hover:text-brand-400 transition-colors duration-300"
          >
            Volver arriba
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

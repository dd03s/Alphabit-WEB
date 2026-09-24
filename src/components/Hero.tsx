import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand-100/40 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-brand-50/60 blur-[100px]" />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative section-container pt-32 pb-20">
        <div className="max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 animate-fade-down"
            style={{ animationDelay: '0.1s' }}
          >
            <Sparkles size={14} className="text-brand-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-700">
              Estudio de Diseño & Estrategia Visual · El Salvador
            </span>
          </div>

          <p
            className="text-sm font-bold tracking-[0.3em] uppercase text-brand-600 mt-8 animate-fade-up"
            style={{ animationDelay: '0.15s' }}
          >
            Servicios Digitales
          </p>

          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.95] mt-3 tracking-tighter animate-fade-up text-ink-900"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-ink-900">ALPHA</span>
            <span className="text-gradient-brand">BIT</span>
          </h1>

          <p
            className="text-ink-600 text-lg md:text-xl font-light mt-8 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            Transformamos ideas en experiencias visuales memorables. Diseño, branding
            y comunicación digital.
          </p>

          <div
            className="flex flex-wrap gap-4 mt-10 animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <button onClick={scrollToProjects} className="btn-primary">
              Explorar Proyectos
              <ArrowDown size={16} />
            </button>
            <a href="#contacto" className="btn-secondary">
              Hablemos de tu Marca
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.6rem] tracking-[0.3em] uppercase text-ink-400 font-semibold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-500 to-transparent animate-bounce-arrow" />
      </div>
    </section>
  );
}

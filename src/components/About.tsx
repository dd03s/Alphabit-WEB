import { Target, Heart, Lightbulb } from 'lucide-react';

const VALUE_ICONS = [Target, Heart, Lightbulb];
const VALUE_LABELS = ['Identidad & Branding', 'Producción Fotográfica', 'Dirección Digital'];
const VALUE_DESCS = [
  'Sistemas visuales duraderos con tipografía distintiva y personalidad propia.',
  'Dirección fotográfica de producto, moda y arquitectura con estética editorial.',
  'Interfaces limpias y minimalistas diseñadas con fluidez y precisión milimétrica.',
];

export function About() {
  return (
    <section id="nosotros" className="relative py-24 md:py-32 bg-ink-50">
      <div className="section-container">
        <div className="rounded-3xl bg-white border border-ink-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left — text */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-3">
                <span className="section-badge">Agencia</span>
                <span className="section-eyebrow mt-0">Nuestra esencia</span>
              </div>
              <h2 className="section-title">
                Sobre <span className="text-gradient-brand">ALPHABIT</span>
              </h2>
              <p className="section-subtitle">
                Somos un equipo multidisciplinario dedicado a crear experiencias visuales
                que comunican, inspiran y perduran. Diseño, branding y comunicación digital
                con dirección de arte y producción propia.
              </p>

              {/* Status pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                {['Estudio Creativo Independiente', 'Dirección de Arte & Producción', 'Diseño Funcional & Estético'].map((pill) => (
                  <div
                    key={pill}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-sm font-medium text-brand-700"
                  >
                    <span className="text-brand-500" aria-hidden="true">✦</span>
                    {pill}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — focus cards */}
            <div className="bg-ink-900 p-8 md:p-12 lg:p-16 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-brand-400 bg-brand-500/10 px-3 py-1.5 rounded-full">
                  Enfoque
                </span>
              </div>

              {VALUE_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="group flex gap-5 rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-brand-400/30 transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-400/20 flex items-center justify-center">
                    <span className="font-display font-bold text-brand-400 text-lg">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-1">
                      {label}
                    </h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed">
                      {VALUE_DESCS[i]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

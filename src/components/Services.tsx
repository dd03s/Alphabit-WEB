import { PenTool, Camera, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import type { Service } from '@/types';

interface ServicesProps {
  services: Service[] | null;
  loading: boolean;
  error: string | null;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'graphic-design': PenTool,
  'camera': Camera,
  'book': BookOpen,
};

const FALLBACK_ICONS = [PenTool, Camera, BookOpen];

function ServiceSkeleton() {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-8 space-y-4 shadow-sm">
      <div className="skeleton h-12 w-12 rounded-xl" />
      <div className="skeleton h-6 w-2/3 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-4/5 rounded" />
    </div>
  );
}

export function Services({ services, loading, error }: ServicesProps) {
  const list = services || [];

  return (
    <section id="servicios" className="relative py-24 md:py-32 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="section-badge">Disciplinas</span>
            <span className="section-eyebrow mt-0">Áreas de enfoque</span>
          </div>
          <h2 className="section-title">
            Nuestros <span className="text-gradient-brand">Servicios</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Soluciones visuales y estratégicas diseñadas a la medida de tu proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <ServiceSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-100">
                <AlertCircle size={24} className="text-red-400" />
              </div>
              <p className="text-ink-500 font-light text-base text-center max-w-sm">
                No pudimos cargar los servicios. Verifica tu conexión e intenta de nuevo.
              </p>
              <p className="text-xs text-ink-300 font-mono">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ink-200 text-sm font-semibold text-ink-600 hover:border-brand-400 hover:text-brand-600 transition-all duration-300"
              >
                <RefreshCw size={14} />
                Reintentar
              </button>
            </div>
          ) : list.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-ink-400 font-light text-lg">
                No hay servicios publicados todavía.
              </p>
            </div>
          ) : (
            list.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || FALLBACK_ICONS[i % FALLBACK_ICONS.length];
              return (
                <div
                  key={service.id || service._id || i}
                  className="group relative rounded-2xl border border-ink-100 bg-white p-8 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:border-brand-600 transition-all duration-500">
                    <Icon size={24} className="text-brand-600 group-hover:text-white transition-colors duration-500" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-ink-500 text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

import { useState, useMemo, useEffect, useCallback } from 'react';
import { X, Calendar, User, Tag, ArrowUpRight, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectsProps {
  projects: Project[] | null;
  loading: boolean;
  error: string | null;
}

const CATEGORIES = ['Todos', 'LOGOS', 'BRANDING', 'DISEÑO PUBLICITARIO', 'DISEÑO EDITORIAL', 'FOTOGRAFÍA'];

function ProjectSkeleton() {
  return (
    <div className="aspect-[4/5] rounded-2xl overflow-hidden">
      <div className="skeleton w-full h-full" />
    </div>
  );
}

function projectId(p: Project): string {
  return p.id || p._id || '';
}

export function Projects({ projects, loading, error }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const availableCategories = useMemo(() => {
    if (!projects) return CATEGORIES;
    const present = new Set(projects.map((p) => p.category).filter(Boolean));
    const cats = CATEGORIES.filter((c) => c === 'Todos' || present.has(c));
    const extra = Array.from(present).filter((c) => !CATEGORIES.includes(c));
    return [...cats, ...extra];
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (activeCategory === 'Todos') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const selected = selectedIdx !== null ? filtered[selectedIdx] : null;

  const closeModal = useCallback(() => setSelectedIdx(null), []);

  const prevProject = useCallback(() => {
    setSelectedIdx((idx) => {
      if (idx === null) return idx;
      return (idx - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const nextProject = useCallback(() => {
    setSelectedIdx((idx) => {
      if (idx === null) return idx;
      return (idx + 1) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedIdx, closeModal, prevProject, nextProject]);

  return (
    <section id="proyectos" className="relative py-24 md:py-32 bg-ink-50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="section-badge">Portafolio</span>
              <span className="section-eyebrow mt-0">Casos seleccionados</span>
            </div>
            <h2 className="section-title">Trabajo Reciente</h2>
            <p className="section-subtitle">
              Explora nuestra selección de proyectos en diseño de marcas, fotografía y editorial.
            </p>
          </div>
        </div>

        {/* Category filter */}
        {!loading && !error && projects && projects.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-12">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-ink-900 text-white'
                    : 'bg-white border border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-600'
                }`}
              >
                {cat === 'Todos' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-100">
                <AlertCircle size={24} className="text-red-400" />
              </div>
              <p className="text-ink-500 font-light text-base text-center max-w-sm">
                No pudimos cargar los proyectos. Verifica tu conexión e intenta de nuevo.
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
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-ink-400 font-light text-lg">
                No hay proyectos en esta categoría todavía.
              </p>
            </div>
          ) : (
            filtered.map((project, i) => (
              <article
                key={projectId(project) || i}
                onClick={() => setSelectedIdx(i)}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-ink-100 to-ink-200" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-sm text-white/60 font-light mb-1">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-white/70 font-light line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-brand-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    Ver proyecto
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Project modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-md animate-fade-in" />

          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/90 shadow-md text-ink-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-300"
              onClick={closeModal}
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="absolute top-5 left-5 z-10 flex gap-2">
              <button
                className="p-2.5 rounded-full bg-white/90 shadow-md text-ink-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-300"
                onClick={prevProject}
                aria-label="Proyecto anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="p-2.5 rounded-full bg-white/90 shadow-md text-ink-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-300"
                onClick={nextProject}
                aria-label="Siguiente proyecto"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="relative aspect-[16/10] rounded-t-3xl overflow-hidden bg-ink-100">
              {selected.coverImage ? (
                <img
                  src={selected.coverImage}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-ink-100 to-ink-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-brand-400">
                  {selected.category}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
                  {selected.title}
                </h3>
                {selected.subtitle && (
                  <p className="text-white/70 font-light mt-1">{selected.subtitle}</p>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-ink-600">
                  <User size={16} className="text-brand-500" />
                  <span className="font-medium">{selected.client || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-600">
                  <Calendar size={16} className="text-brand-500" />
                  <span className="font-medium">{selected.year || selected.date || 'N/A'}</span>
                </div>
              </div>

              <p className="text-ink-600 font-light leading-relaxed text-base md:text-lg">
                {selected.description}
              </p>

              {selected.tags && selected.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={16} className="text-brand-500" />
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-ink-200 text-ink-600 bg-ink-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

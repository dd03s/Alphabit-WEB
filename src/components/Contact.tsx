import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import type { Service } from '@/types';
import { api, ApiError } from '@/services/api';

interface ContactProps {
  services: Service[] | null;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact({ services }: ContactProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await api.sendContact(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof ApiError ? err.message : 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const serviceList = services || [];

  return (
    <section id="contacto" className="relative py-24 md:py-32 bg-white">
      <div className="section-container">
        <div className="rounded-3xl bg-ink-50 border border-ink-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left — info */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-3">
                <span className="section-badge">Conectemos</span>
                <span className="section-eyebrow mt-0">Hablemos</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mt-4 leading-tight tracking-tight">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="text-ink-500 text-base font-light mt-4 leading-relaxed max-w-md">
                Conversemos sobre cómo elevar la identidad, la narrativa visual y el impacto
                estético de tu marca o empresa.
              </p>

              {/* Perks */}
              <div className="mt-8 space-y-3">
                {[
                  'Respuesta en menos de 24 horas hábiles',
                  'Asesoría directa y cotización personalizada',
                  'Proyectos locales e internacionales',
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-sm text-ink-600 font-medium">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 text-brand-600 text-xs">
                      ✓
                    </span>
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="p-8 md:p-12 lg:p-16 bg-white">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-2 block">
                    Tu nombre o empresa *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Ej: María González / Estudio Creativo"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-2 block">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="nombre@correo.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-2 block">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+503 7000-0000"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-2 block">
                    Servicio de interés
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="input-field cursor-pointer"
                  >
                    <option value="">Selecciona una disciplina...</option>
                    {serviceList.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-2 block">
                    Cuéntanos sobre tu proyecto *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Breve descripción del alcance, objetivos o fechas estimadas..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                  {status !== 'sending' && <Send size={16} />}
                </button>

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-brand-600 text-sm font-medium animate-fade-in">
                    <CheckCircle size={18} />
                    ¡Mensaje enviado! Te responderemos pronto.
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-fade-in">
                    <AlertCircle size={18} />
                    {errorMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

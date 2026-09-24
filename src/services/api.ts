import type { Project, Service, ContactPayload } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new ApiError(
      errorBody.error || errorBody.message || `Error ${res.status}`,
      res.status,
    );
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  getProjects: (category?: string, featured?: boolean) => {
    const params = new URLSearchParams();
    if (category && category !== 'Todos') params.set('category', category);
    if (featured) params.set('featured', 'true');
    const query = params.toString();
    return request<Project[]>(`/projects${query ? `?${query}` : ''}`);
  },

  getProject: (id: string) => request<Project>(`/projects/${id}`),

  getServices: () => request<Service[]>('/services'),

  sendContact: (data: ContactPayload) =>
    request<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export { ApiError };
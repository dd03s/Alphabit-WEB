import { useState, useEffect } from 'react';
import { api, ApiError } from '@/services/api';
import type { Project, Service } from '@/types';

interface UseQueryState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useProjects(category?: string, featured?: boolean) {
  const [state, setState] = useState<UseQueryState<Project>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      setState({ data: [], loading: true, error: null });
      try {
        const data = await api.getProjects(category, featured);
        setState({ data, loading: false, error: null });
      } catch (err) {
        const message = err instanceof ApiError ? err.message : 'Error fetching projects';
        setState({ data: [], loading: false, error: message });
      }
    };

    fetchProjects();
  }, [category, featured]);

  return state;
}

export function useServices() {
  const [state, setState] = useState<UseQueryState<Service>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchServices = async () => {
      setState({ data: [], loading: true, error: null });
      try {
        const data = await api.getServices();
        setState({ data, loading: false, error: null });
      } catch (err) {
        const message = err instanceof ApiError ? err.message : 'Error fetching services';
        setState({ data: [], loading: false, error: message });
      }
    };

    fetchServices();
  }, []);

  return state;
}
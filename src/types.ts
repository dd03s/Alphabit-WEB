export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  tags?: string[];
  date?: string;
  year?: string | number;
  coverImage: string;
  images?: string[];
  excerpt?: string;
  description: string;
  slug: string;
  status?: 'published' | 'draft';
  featured?: boolean;
  client?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}
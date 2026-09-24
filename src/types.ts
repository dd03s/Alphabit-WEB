export interface Project {
  _id: string;
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  date: string;
  year?: string | number;
  coverImage: string;
  imageUrl: string;
  excerpt: string;
  description: string;
  slug: string;
  status: 'published' | 'draft';
  featured: boolean;
  client?: string;
  link?: string;
  createdAt: number;
  updatedAt: number;
  body?: Array<{
    type: 'text' | 'image';
    content?: string;
    url?: string;
    caption?: string;
  }>;
}

export interface Service {
  _id: string;
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  service?: string;
}
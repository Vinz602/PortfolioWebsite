export type ProjectCategory = 
  | "Computer Vision"
  | "NLP"
  | "Deep Learning"
  | "Data Analysis"
  | "All";

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  date: string;
  featured: boolean;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  content: string;
}

export interface Category {
  id: string;
  label: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormValidation {
  name?: string;
  email?: string;
  message?: string;
}

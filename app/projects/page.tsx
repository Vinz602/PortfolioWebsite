import { getAllProjects, getAllCategories } from '@/lib/projects';
import ProjectsClient from './ProjectsClient';

// Server component - fetches data at build time
export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const categories = getAllCategories();

  return <ProjectsClient allProjects={allProjects} categories={categories} />;
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Project, ProjectCategory } from '@/types/project';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

/**
 * Get all projects from the content/projects directory
 */
export function getAllProjects(): Project[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(projectsDirectory)) {
      console.warn('Projects directory does not exist');
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return getProjectBySlug(slug);
      })
      .filter((project): project is Project => project !== null);

    // Sort by date (newest first)
    return allProjectsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      console.error(`Invalid project data in ${slug}.md`);
      return null;
    }

    // Convert markdown to HTML
    const htmlContent = marked(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      category: data.category as ProjectCategory,
      tags: data.tags || [],
      date: data.date || new Date().toISOString(),
      featured: data.featured || false,
      image: data.image || '/images/projects/placeholder.svg',
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories from projects
 */
export function getAllCategories(): ProjectCategory[] {
  const projects = getAllProjects();
  const categories = new Set<ProjectCategory>();

  projects.forEach((project) => {
    categories.add(project.category);
  });

  return ['All', ...Array.from(categories)];
}

/**
 * Filter projects by category
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  const allProjects = getAllProjects();

  if (category === 'All') {
    return allProjects;
  }

  return allProjects.filter((project) => project.category === category);
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.featured);
}

/**
 * Get all project slugs (for static generation)
 */
export function getAllProjectSlugs(): string[] {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading project slugs:', error);
    return [];
  }
}

import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';
import styles from './ProjectGrid.module.css';

interface ProjectGridProps {
  projects: Project[];
  columns?: 1 | 2 | 3;
}

export default function ProjectGrid({ projects, columns }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No projects found.</p>
        <p>Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Pick<Project, 'slug' | 'title' | 'description' | 'image' | 'tags' | 'category' | 'featured' | 'date'>;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <article className={styles.card} data-testid="project-card">
      <Link href={`/projects/${project.slug}/`}>
        <div className={styles.imageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={450}
            className={styles.image}
            loading="lazy"
          />
          {project.featured && (
            <span className={styles.featuredBadge}>Featured</span>
          )}
        </div>

        <div className={styles.content}>
          <span className={styles.category} data-testid="project-category">
            {project.category}
          </span>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>

          <ul className={styles.tags}>
            {project.tags.slice(0, 4).map((tag, index) => (
              <li key={index} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>

          <time className={styles.date} dateTime={project.date}>
            {formatDate(project.date)}
          </time>
        </div>
      </Link>
    </article>
  );
}

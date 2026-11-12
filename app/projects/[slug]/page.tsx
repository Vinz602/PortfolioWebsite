import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectBySlug, getAllProjectSlugs, getAllProjects } from '@/lib/projects';
import styles from './page.module.css';

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Get related projects (same category, excluding current)
  const allProjects = getAllProjects();
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <article className={styles.projectDetail}>
      <div className="container">
        {/* Back Button */}
        <Link href="/projects/" className={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10H5M5 10l4-4m-4 4l4 4" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className={styles.header}>
          <span className={styles.category}>{project.category}</span>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>

          {/* Tags */}
          <ul className={styles.tags}>
            {project.tags.map((tag, index) => (
              <li key={index} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className={styles.links}>
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.linkButton} ${styles.primaryLink}`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Project Image */}
        <div className={styles.imageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className={styles.image}
            priority
          />
        </div>

        {/* Project Content */}
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: project.content }}
        />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className={styles.relatedSection}>
            <h2>Related Projects</h2>
            <div className={styles.relatedGrid}>
              {relatedProjects.map((related) => (
                <Link 
                  key={related.slug} 
                  href={`/projects/${related.slug}/`}
                  className={styles.relatedCard}
                >
                  <h3>{related.title}</h3>
                  <p>{related.description}</p>
                  <span className={styles.viewMore}>View Project →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

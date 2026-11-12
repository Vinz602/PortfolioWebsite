import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectGrid from '@/components/ProjectGrid';
import styles from './page.module.css';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Machine Learning <span className={styles.highlight}>Portfolio</span>
          </h1>
          <p className={styles.heroDescription}>
            Explore cutting-edge machine learning projects spanning computer vision, 
            natural language processing, and data analysis. Each project includes 
            detailed methodology, results, and source code.
          </p>
          <div className={styles.heroCta}>
            <Link href="/projects/" className={styles.primaryButton}>
              View All Projects
            </Link>
            <Link href="/contact/" className={styles.secondaryButton}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={styles.featuredSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionDescription}>
            Highlighting some of my best work in machine learning and AI
          </p>
          {featuredProjects.length > 0 ? (
            <ProjectGrid projects={featuredProjects} />
          ) : (
            <p className={styles.emptyState}>
              No featured projects yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2>Interested in Collaboration?</h2>
          <p>Let's discuss how we can work together on your next ML project</p>
          <Link href="/contact/" className={styles.primaryButton}>
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
}

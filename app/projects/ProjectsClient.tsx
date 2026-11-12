'use client';

import { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '@/types/project';
import CategoryFilter from '@/components/CategoryFilter';
import ProjectGrid from '@/components/ProjectGrid';
import styles from './page.module.css';

interface ProjectsClientProps {
  allProjects: Project[];
  categories: ProjectCategory[];
}

export default function ProjectsClient({ allProjects, categories }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return allProjects;
    }
    return allProjects.filter((project) => project.category === activeCategory);
  }, [allProjects, activeCategory]);

  return (
    <div className={styles.projectsPage}>
      <div className="container">
        <header className={styles.pageHeader}>
          <h1>All Projects</h1>
          <p className={styles.pageDescription}>
            Explore my machine learning and AI projects. Each project includes detailed 
            documentation, source code, and results.
          </p>
        </header>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProjectGrid projects={filteredProjects} />
      </div>
    </div>
  );
}

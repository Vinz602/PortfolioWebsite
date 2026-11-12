'use client';

import { ProjectCategory } from '@/types/project';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: ProjectCategory[];
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'All': 'All Projects',
  'Computer Vision': 'Computer Vision',
  'NLP': 'NLP',
  'Deep Learning': 'Deep Learning',
  'Data Analysis': 'Data Analysis',
};

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className={styles.filterContainer} role="tablist" aria-label="Project categories">
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
          onClick={() => onCategoryChange(category)}
          role="tab"
          aria-pressed={activeCategory === category}
          aria-label={`Filter by ${category}`}
        >
          {CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  );
}

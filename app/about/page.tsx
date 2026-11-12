import styles from './page.module.css';

export default function AboutPage() {
  const skills = [
    { category: 'Machine Learning', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost'] },
    { category: 'Deep Learning', items: ['CNN', 'RNN/LSTM', 'Transformers', 'GANs'] },
    { category: 'NLP', items: ['BERT', 'GPT', 'SpaCy', 'NLTK'] },
    { category: 'Computer Vision', items: ['OpenCV', 'YOLO', 'Image Segmentation', 'Object Detection'] },
    { category: 'Data Science', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
    { category: 'MLOps', items: ['Docker', 'AWS', 'MLflow', 'FastAPI'] },
  ];

  return (
    <div className={styles.aboutPage}>
      <div className="container">
        <header className={styles.pageHeader}>
          <h1>About Me</h1>
        </header>

        {/* Bio Section */}
        <section className={styles.bioSection}>
          <div className={styles.bioContent}>
          <h2>Hi, I'm Vincent Christian Atmadjaya</h2>
            <p>
              I'm a machine learning engineer and data scientist passionate about building 
              intelligent systems that solve real-world problems. With a strong foundation 
              in computer science and years of experience in ML/AI, I specialize in developing 
              end-to-end solutions from research to production.
            </p>
            <p>
              My work spans multiple domains including computer vision, natural language processing, 
              and predictive analytics. I believe in the power of open source and continuous 
              learning, which is why I share my projects and insights with the community.
            </p>
            <p>
              When I'm not training models or analyzing data, you can find me contributing to 
              open-source projects, writing technical blog posts, or exploring the latest 
              research papers in machine learning.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className={styles.skillsSection}>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className={styles.skillCard}>
                <h3 className={styles.skillCategory}>{skillGroup.category}</h3>
                <ul className={styles.skillList}>
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className={styles.skillItem}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className={styles.experienceSection}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDate}>2022 - Present</div>
              <div className={styles.timelineContent}>
                <h3>Senior ML Engineer</h3>
                <p className={styles.company}>Tech Company Inc.</p>
                <p>
                  Leading ML initiatives and building production-ready models for computer 
                  vision and NLP applications. Designed and deployed scalable ML pipelines 
                  serving millions of users.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDate}>2020 - 2022</div>
              <div className={styles.timelineContent}>
                <h3>ML Engineer</h3>
                <p className={styles.company}>AI Startup</p>
                <p>
                  Developed predictive models and recommendation systems. Improved model 
                  accuracy by 25% through advanced feature engineering and hyperparameter tuning.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDate}>2018 - 2020</div>
              <div className={styles.timelineContent}>
                <h3>Data Scientist</h3>
                <p className={styles.company}>Analytics Firm</p>
                <p>
                  Analyzed large datasets and built statistical models for business intelligence. 
                  Created data visualization dashboards for stakeholder reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className={styles.educationSection}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.educationCard}>
            <h3>Master of Science in Computer Science</h3>
            <p className={styles.university}>University Name | 2018</p>
            <p>Specialization in Machine Learning and Artificial Intelligence</p>
          </div>
          <div className={styles.educationCard}>
            <h3>Bachelor of Science in Computer Science</h3>
            <p className={styles.university}>University Name | 2016</p>
            <p>Focus on Data Structures, Algorithms, and Mathematics</p>
          </div>
        </section>

        {/* Social Links */}
        <section className={styles.socialSection}>
          <h2 className={styles.sectionTitle}>Connect With Me</h2>
          <div className={styles.socialLinks}>
            <a href="https://github.com/Vinz602" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span>Twitter</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

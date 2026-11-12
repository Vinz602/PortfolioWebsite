'use client';

import ContactForm from '@/components/ContactForm';
import { ContactFormData } from '@/types/project';
import styles from './page.module.css';

export default function ContactPage() {
  const handleSubmit = async (data: ContactFormData) => {
    // In a real application, this would send to an API endpoint
    // For now, we'll simulate an API call
    console.log('Form submitted:', data);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In production, you would send to:
    // - Formspree
    // - Netlify Forms
    // - Your own API endpoint
    // - Email service like SendGrid
    
    // Example with fetch:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Failed to send message');
  };

  return (
    <div className={styles.contactPage}>
      <div className="container">
        <header className={styles.pageHeader}>
          <h1>Get in Touch</h1>
          <p className={styles.pageDescription}>
            I'm always open to discussing new projects, collaboration opportunities, 
            or just having a chat about machine learning and AI.
          </p>
        </header>

        <div className={styles.contactContent}>
          <div className={styles.formContainer}>
            <ContactForm onSubmit={handleSubmit} />
          </div>

          <div className={styles.contactInfo}>
            <h2>Contact Information</h2>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3>Email</h3>
              <a href="mailto:vincent.atmadjaya@example.com">vincent.atmadjaya@example.com</a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3>Location</h3>
                <p>San Francisco, CA</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div>
                <h3>GitHub</h3>
                <a href="https://github.com/Vinz602" target="_blank" rel="noopener noreferrer">
                  @Vinz602
                </a>
              </div>
            </div>

            <div className={styles.responseTime}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>I typically respond within 24-48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

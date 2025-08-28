"use client";
import { homeContent } from "@/shared/config/content/home";
import styles from "./Reviews.module.css";

export const Reviews = () => {
  const { reviews } = homeContent;

  return (
    <section className={styles.reviews} aria-labelledby="reviews-title">
      <h2 id="reviews-title" className={styles.reviews__title}>
        {reviews.title}
      </h2>

      <article className={styles.reviews__card}>
        <blockquote className={styles.reviews__quote}>
          {reviews.quote}
        </blockquote>
        <footer className={styles.reviews__author}>
          <div className={styles.reviews__authorName}>{reviews.author}</div>
          <div className={styles.reviews__authorMeta}>{reviews.position}</div>
        </footer>
      </article>

      <div className={styles.reviews__progress} aria-hidden>
        <span className={styles.reviews__dot} />
        <span className={styles.reviews__dot} />
        <span className={styles.reviews__dot} />
        <span className={styles.reviews__dot} />
        <span className={styles.reviews__dot} />
      </div>

      <div className={styles.reviews__ctaRow}>
        <a href="#thanks" className={styles.reviews__cta}>
          {reviews.cta}
        </a>
      </div>
    </section>
  );
};

"use client";
import Link from "next/link";
import { homeContent } from "@/shared/config/content/home";
import styles from "./Hero.module.css";

export const Hero = () => {
  const {
    heading,
    subheading,
    trainingText,
    primaryCta,
    secondaryCta,
    outlineCta,
  } = homeContent.hero;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.hero__inner}>
        <h1 id="hero-heading" className={styles.hero__heading}>
          {heading}
        </h1>
        <p className={styles.hero__subheading}>{subheading}</p>
        <p className={styles.hero__training}>{trainingText}</p>

        <div
          className={styles.hero__actions}
          role="group"
          aria-label="Hero actions"
        >
          <Link
            href={primaryCta.href}
            className={`${styles.hero__btn} ${styles["hero__btn--primary"]}`}
            aria-label={primaryCta.label}
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className={`${styles.hero__btn} ${styles["hero__btn--secondary"]}`}
            aria-label={secondaryCta.label}
          >
            {secondaryCta.label}
          </Link>
          <Link
            href={outlineCta.href}
            className={`${styles.hero__btn} ${styles["hero__btn--outline"]}`}
            aria-label={outlineCta.label}
          >
            {outlineCta.label}
          </Link>
        </div>

        <div className={styles.hero__progress} aria-hidden="true">
          <span
            className={`${styles.hero__progressDot} ${styles["hero__progressDot--wide"]} ${styles["hero__progressDot--highlight"]}`}
          />
          <span
            className={`${styles.hero__progressDot} ${styles["hero__progressDot--md"]}`}
          />
          <span
            className={`${styles.hero__progressDot} ${styles["hero__progressDot--md"]}`}
          />
          <span
            className={`${styles.hero__progressDot} ${styles["hero__progressDot--lg"]}`}
          />
          <span
            className={`${styles.hero__progressDot} ${styles["hero__progressDot--xl"]}`}
          />
          <span
            className={`${styles.hero__progressDot} ${styles["hero__progressDot--lg"]}`}
          />
          <span
            className={`${styles.hero__progressDot} ${styles["hero__progressDot--xl"]}`}
          />
        </div>
      </div>
    </section>
  );
};

"use client";
import { memo } from "react";
import { homeContent } from "@/shared/config/content/home";
import { ScrollSequence } from "@/shared/ui";
import { AdvantagesGradient } from "@/shared/ui/GradientShapes";
import styles from "./Advantages.module.css";

export const Advantages = memo(() => {
  const { advantages } = homeContent;

  return (
    <section className={styles.advantages} aria-labelledby="advantages-title">
      {/* Background gradient */}
      <AdvantagesGradient
        style={{
          position: "absolute",
          top: "0",
          left: "-50%",
          zIndex: 1,
        }}
      />

      <div className="container">
        <h2 id="advantages-title" className={styles.advantages__title}>
          {advantages.title}
        </h2>

        <ScrollSequence
          items={advantages.cards}
          height={320}
          cardSpacing={20}
          endPadding={3000}
          renderItem={(card) => (
            <article className={styles.advantages__card}>
              <h3 className={styles.advantages__cardTitle}>{card.title}</h3>
              {card.description && (
                <p className={styles.advantages__text}>{card.description}</p>
              )}
              <ul className={styles.advantages__list}>
                {card.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className={styles.advantages__listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}
        />
      </div>
    </section>
  );
});

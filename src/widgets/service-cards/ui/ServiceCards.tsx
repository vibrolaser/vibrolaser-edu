"use client";
import { homeContent } from "@/shared/config/content/home";
import { ScrollSequence, Button } from "@/shared/ui";
import styles from "./ServiceCards.module.css";

export const ServiceCards = () => {
  const { features } = homeContent;

  return (
    <section
      className={styles.serviceCards}
      aria-labelledby="service-cards-title"
    >
      <div className={styles.serviceCards__inner}>
        <div className="container">
          <h2 id="service-cards-title" className={styles.serviceCards__heading}>
            {features.title}
          </h2>

          <ScrollSequence
            items={features.cards}
            height={320}
            cardSpacing={20}
            endPadding={3000}
            renderItem={(card, index) => (
              <article
                aria-labelledby={`service-cards-${index}-title`}
                className={`${styles.serviceCards__card} ${
                  styles[
                    `serviceCards__card--${
                      index === 0 ? "uc" : index === 1 ? "lnk" : "vibro"
                    }`
                  ]
                }`}
              >
                <div className={styles.serviceCards__media} aria-hidden />
                <h3
                  id={`service-cards-${index}-title`}
                  className={styles.serviceCards__cardTitle}
                >
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className={styles.serviceCards__cardSubtitle}>
                    {card.subtitle}
                  </p>
                )}

                {card.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className={styles.serviceCards__service}
                  >
                    {serviceIndex > 0 && (
                      <div
                        className={styles.serviceCards__divider}
                        aria-hidden
                      />
                    )}
                    <h4 className={styles.serviceCards__itemTitle}>
                      {service.name}
                    </h4>
                    <div className={styles.serviceCards__price}>
                      {service.price}
                    </div>
                    <Button
                      as="a"
                      href={service.href}
                      variant="primary"
                      size="md"
                      aria-label={`Подробнее о ${service.name}`}
                    >
                      Подробнее
                    </Button>
                  </div>
                ))}
              </article>
            )}
          />
        </div>
      </div>
    </section>
  );
};

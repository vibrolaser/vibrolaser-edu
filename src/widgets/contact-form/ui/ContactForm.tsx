"use client";
import { useCallback, useMemo, useState } from "react";
import { homeContent } from "@/shared/config/content/home";
import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  comment: string;
  consent: boolean;
};

export const ContactForm = () => {
  const { contact } = homeContent;

  const initialState = useMemo<FormState>(
    () => ({
      name: "",
      phone: "",
      email: "",
      topic: "courses",
      comment: "",
      consent: false,
    }),
    []
  );
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type, checked } = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name || !form.phone || !form.email || !form.consent) {
        setStatus("error");
        return;
      }
      setIsSubmitting(true);
      setStatus("idle");
      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            topic: form.topic,
            comment: form.comment,
            consent: form.consent,
          }),
        });
        if (!response.ok) throw new Error("Request failed");
        setStatus("success");
        setForm(initialState);
      } catch (err) {
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, initialState]
  );

  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title" className={styles.contact__title}>
        {contact.title}
      </h2>
      <p className={styles.contact__subtitle}>{contact.subtitle}</p>

      <form
        className={styles.contact__form}
        aria-label="Форма обратной связи"
        onSubmit={handleSubmit}
      >
        <label className={styles.contact__label}>
          <span className={styles.contact__labelText}>ФИО</span>
          <input
            className={styles.contact__input}
            name="name"
            type="text"
            placeholder="Иванов Иван"
            aria-label="ФИО"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.contact__label}>
          <span className={styles.contact__labelText}>Телефон</span>
          <input
            className={styles.contact__input}
            name="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            aria-label="Телефон"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.contact__label}>
          <span className={styles.contact__labelText}>E-mail</span>
          <input
            className={styles.contact__input}
            name="email"
            type="email"
            placeholder="you@mail.com"
            aria-label="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.contact__label}>
          <span className={styles.contact__labelText}>Выберите тему</span>
          <select
            className={styles.contact__select}
            name="topic"
            aria-label="Выберите тему"
            value={form.topic}
            onChange={handleChange}
          >
            <option value="courses">Курсы</option>
            <option value="lnk">Лаборатория НК</option>
            <option value="exam">Экзаменационный центр</option>
            <option value="vibro">Виброналадка</option>
          </select>
        </label>
        <label className={styles.contact__label}>
          <span className={styles.contact__labelText}>
            Комментарии (по желанию)
          </span>
          <textarea
            className={styles.contact__textarea}
            name="comment"
            rows={4}
            aria-label="Комментарии"
            value={form.comment}
            onChange={handleChange}
          />
        </label>

        <label className={styles.contact__consent}>
          <input
            className={styles.contact__checkbox}
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            aria-label="Согласие на обработку персональных данных"
          />
          <span className={styles.contact__consentText}>{contact.consent}</span>
        </label>

        <button
          type="submit"
          className={styles.contact__submit}
          aria-label="Оставить заявку"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Оставить заявку"}
        </button>
        <span className={styles.contact__status} aria-live="polite">
          {status === "success" && "Заявка отправлена"}
          {status === "error" &&
            "Проверьте обязательные поля и попробуйте ещё раз"}
        </span>
      </form>
    </section>
  );
};

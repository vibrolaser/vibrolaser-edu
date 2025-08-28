"use client";
import Link from "next/link";
import { useScrollHeader, useMobileMenu } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import styles from "./Header.module.css";

const NAVIGATION_ITEMS = [
  { href: "#courses", label: "Курсы" },
  { href: "#ec", label: "Экзаменационный центр" },
  { href: "#lnk", label: "Лаборатория НК" },
  { href: "#equipment", label: "Учебное оборудование" },
  { href: "#docs", label: "Документы" },
] as const;

const ACTION_BUTTONS = [
  { href: "#schedule-2025", label: "Расписание 2025", variant: "outline" },
  { href: "#schedule-2026", label: "Расписание 2026", variant: "outline" },
  { href: "#contact", label: "Оставить заявку", variant: "accent" },
] as const;

const PHONE_NUMBER = "+7 812 900-50-51";

export const Header = () => {
  const { isScrolled, isVisible } = useScrollHeader();
  const { isOpen, handleToggle, handleClose } = useMobileMenu();

  const headerClassName = `${styles.header} ${
    isScrolled ? styles.headerScrolled : ""
  } ${isVisible ? styles.headerVisible : styles.headerHidden}`;

  const handleNavLinkClick = () => {
    handleClose();
  };

  const renderNavigation = (isMobile = false) => (
    <ul
      className={
        isMobile ? styles.header__mobileNavList : styles.header__navList
      }
    >
      {NAVIGATION_ITEMS.map(({ href, label }) => (
        <li
          key={href}
          className={
            isMobile ? styles.header__mobileNavItem : styles.header__navItem
          }
        >
          <Link
            href={href}
            className={
              isMobile ? styles.header__mobileNavLink : styles.header__navLink
            }
            onClick={isMobile ? handleClose : handleNavLinkClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderActionButtons = (isMobile = false) => {
    const mapToButtonVariant = (v: "outline" | "accent") =>
      v === "accent" ? "primary" : "secondary";

    return (
      <>
        <div
          className={
            isMobile ? styles.header__mobilePhones : styles.header__phones
          }
        >
          <a
            className={
              isMobile
                ? styles.header__mobilePhoneLink
                : styles.header__phoneLink
            }
            href={`tel:${PHONE_NUMBER}`}
            aria-label={`Позвонить ${PHONE_NUMBER}`}
          >
            {PHONE_NUMBER}
          </a>
        </div>

        {ACTION_BUTTONS.map(({ href, label, variant }) => (
          <Button
            key={href}
            as="a"
            href={href}
            variant={mapToButtonVariant(variant)}
            size={isMobile ? "md" : "sm"}
            block={isMobile}
            onClick={isMobile ? handleClose : undefined}
            aria-label={label}
          >
            {label}
          </Button>
        ))}
      </>
    );
  };

  return (
    <header className={headerClassName} role="banner">
      <div className="container">
        <div className={styles.header__body}>
          <div
            className={styles.header__logo}
            aria-label="УЦ ВиброЛазер логотип"
          />
          <div className={styles.header__inner}>
            <nav className={styles.header__nav} aria-label="Главное меню">
              {renderNavigation()}
            </nav>

            <div className={styles.header__actions}>
              {renderActionButtons()}
            </div>

            <button
              className={styles.header__burger}
              onClick={handleToggle}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Открыть меню"
              type="button"
            >
              <span className={styles.header__burgerLine}></span>
              <span className={styles.header__burgerLine}></span>
              <span className={styles.header__burgerLine}></span>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`${styles.header__mobileOverlay} ${
              isOpen ? styles.header__mobileOverlayOpen : ""
            }`}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`${styles.header__mobileMenu} ${
              isOpen ? styles.header__mobileMenuOpen : ""
            }`}
            aria-hidden={!isOpen}
          >
            <div className={styles.header__mobileMenuHeader}>
              <div
                className={styles.header__logo}
                aria-label="УЦ ВиброЛазер логотип"
              />
              <button
                className={styles.header__mobileClose}
                onClick={handleClose}
                aria-label="Закрыть меню"
                type="button"
              >
                <span className={styles.header__mobileCloseIcon}>×</span>
              </button>
            </div>

            <nav
              className={styles.header__mobileNav}
              aria-label="Мобильное меню"
            >
              {renderNavigation(true)}
            </nav>

            <div className={styles.header__mobileActions}>
              {renderActionButtons(true)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

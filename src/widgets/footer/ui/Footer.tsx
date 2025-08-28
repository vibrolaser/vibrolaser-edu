"use client";
import { homeContent } from "@/shared/config/content/home";
import { TelegramIcon, VKIcon, QRCodeIcon, LogoIcon } from "@/shared/ui/icons";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { footer } = homeContent;

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footer__grid}>
          {/* Top-Left Block: Branding and Social Media */}
          <div className={styles.footer__block}>
            <div className={styles.footer__logo}>
              <LogoIcon className={styles.footer__logoIcon} />
            </div>
            <div className={styles.footer__socials}>
              <a
                href="#tg"
                className={styles.footer__socialLink}
                aria-label="Telegram"
              >
                <TelegramIcon className={styles.footer__socialIcon} />
              </a>
              <a
                href="#vk"
                className={styles.footer__socialLink}
                aria-label="VKontakte"
              >
                <VKIcon className={styles.footer__socialIcon} />
              </a>
            </div>
          </div>

          {/* Top-Right Block: Legal Links */}
          <div className={styles.footer__block}>
            <div className={styles.footer__legalLinks}>
              <a href="#privacy" className={styles.footer__legalLink}>
                {footer.links.privacy}
              </a>
              <a href="#consent" className={styles.footer__legalLink}>
                {footer.links.consent}
              </a>
            </div>
          </div>

          {/* Bottom-Left Block: Company Info and QR Code */}
          <div className={styles.footer__block}>
            <div className={styles.footer__companySection}>
              <div className={styles.footer__qrContainer}>
                <QRCodeIcon className={styles.footer__qr} />
              </div>
              <div className={styles.footer__companyInfo}>
                <div className={styles.footer__companyName}>
                  {footer.company}
                </div>
                <div className={styles.footer__license}>{footer.license}</div>
              </div>
            </div>
          </div>

          {/* Bottom-Right Block: Address and Contacts */}
          <div className={styles.footer__block}>
            <div className={styles.footer__contactSection}>
              <div className={styles.footer__contactCol}>
                <h3 className={styles.footer__colTitle}>Адрес</h3>
                <address className={styles.footer__address}>
                  {footer.address}
                </address>
              </div>
              <div className={styles.footer__contactCol}>
                <h3 className={styles.footer__colTitle}>Контакты</h3>
                <a
                  className={styles.footer__link}
                  href={`tel:${footer.contacts.phone.replace(/\s/g, "")}`}
                >
                  {footer.contacts.phone}
                </a>
                <a
                  className={styles.footer__link}
                  href={`mailto:${footer.contacts.email}`}
                >
                  {footer.contacts.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

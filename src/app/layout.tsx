import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { SmoothScrollProvider } from "@/shared/ui/SmoothScrollProvider";
import { ScrollProgressBar, ViewportUnits } from "@/shared/ui";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "УЦ ВиброЛазер - Образовательный центр по неразрушающему контролю",
  description:
    "Учебный центр ВиброЛазер - профессиональное обучение по неразрушающему контролю, курсы, экзаменационный центр, лаборатория НК, учебное оборудование",
  keywords: [
    "неразрушающий контроль",
    "обучение НК",
    "курсы НК",
    "экзаменационный центр",
    "лаборатория НК",
    "учебное оборудование",
    "ВиброЛазер",
    "сертификация НК",
  ],
  authors: [{ name: "УЦ ВиброЛазер" }],
  creator: "УЦ ВиброЛазер",
  publisher: "УЦ ВиброЛазер",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vibrolaser-edu.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "УЦ ВиброЛазер - Образовательный центр по неразрушающему контролю",
    description:
      "Профессиональное обучение по неразрушающему контролю, курсы, экзаменационный центр, лаборатория НК",
    url: "https://vibrolaser-edu.ru",
    siteName: "УЦ ВиброЛазер",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "УЦ ВиброЛазер - Образовательный центр по неразрушающему контролю",
    description: "Профессиональное обучение по неразрушающему контролю",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className={`${jost.variable}`}>
        <ViewportUnits />
        <ScrollProgressBar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

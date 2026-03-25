import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import { getSettings } from "@/lib/store";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: {
      default: settings.metaTitle || "The Deoghar Grand Hotel & Spa | Luxury Stay in Deoghar",
      template: `%s | ${settings.hotelName || "The Deoghar Grand Hotel & Spa"}`,
    },
    description: settings.metaDescription || "Experience luxury hospitality near Baba Baidyanath Dham in Deoghar.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-gold focus:px-6 focus:py-3 focus:font-sans focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-white">
          Skip to content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

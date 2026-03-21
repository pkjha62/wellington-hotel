import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "The Deoghar Grand Hotel & Spa | Luxury Stay in Deoghar",
  description:
    "Experience luxury hospitality near Baba Baidyanath Dham in Deoghar. Explore rooms, wellness, dining, events, and curated spiritual stays.",
  openGraph: {
    title: "The Deoghar Grand Hotel & Spa",
    description: "Luxury stay in Deoghar with premium rooms, wellness, events, and pilgrimage-friendly hospitality.",
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"],
  },
};

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
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}

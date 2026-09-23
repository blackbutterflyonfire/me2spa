import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "me2spa | Luxury Massage & Therapy",
  description: "Rejuvenate your body & mind with authentic relaxing therapies. Premium spa experience with professional therapists.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#080B09] text-[#F3F4F6] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFF]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

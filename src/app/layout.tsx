import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Cards - Create beautiful GitHub profile cards",
  description: "Generate beautiful, customizable GitHub profile cards to showcase your GitHub stats, repositories, contributions and more",
  keywords: ["github", "developer", "profile", "cards", "stats", "repositories"],
  authors: [{ name: "Lulu Zhang" }],
  creator: "Lulu Zhang",
  publisher: "Lulu Zhang",
  openGraph: {
    title: "GitHub Cards - Create beautiful GitHub profile cards",
    description: "Generate beautiful, customizable GitHub profile cards to showcase your GitHub stats, repositories, and activity",
    url: "https://github-cards-eight-beta.vercel.app/",
    siteName: "GitHub Cards",
    images: [
      {
        url: "/og-image.png", 
        width: 2260,
        height: 1706,
        alt: "GitHub Cards Preview",
      },
      {
        url: "/og-terminal-layout.png",
        width: 902,
        height: 847,
        alt: "GitHub Cards Terminal Layout",
      },
      {
        url: "/og-receipt-layout.png", // 展示收据布局的图片
        width: 478,
        height: 813,
        alt: "GitHub Cards Receipt Layout",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#0969DA",
  alternates: {
    canonical: "https://github-cards-eight-beta.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Github Card" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-200/30`}
      >
        {children}
      </body>
    </html>
  );
}

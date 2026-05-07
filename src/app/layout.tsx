import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer, Header } from "@/components/page-shell";
import { site } from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Hantavirus Prevention and Outbreak Updates`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  category: "public health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

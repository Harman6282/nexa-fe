import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexa Fashion",
  description: "Discover the latest trends in fashion at Nexa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
       
      </head>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.className} ${geistMono.variable} bg-background-light text-text-main font-display overflow-x-hidden antialiased selection:bg-accent/20 flex flex-col min-h-screen`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}

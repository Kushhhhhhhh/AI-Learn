import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/custom/Header'
import Footer from '@/components/custom/Footer'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "AI Learn",
  description: "It's a platform to learn any concept using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
          <Header />
            {children}
          <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "SUSU – Exam Command Center",
  description: "Student learning dashboard for BBLFKM – Kiberbiztonsági mérnöki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="hu" className={cn("font-sans", geistSans.variable, geistMono.variable)}>
        <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
          <Script
            src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
            strategy="lazyOnload"
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono ,Stack_Sans_Headline} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const StackSansHeadline = Stack_Sans_Headline({
  weight:'400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Paytm",
  description: "Paytm build in nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

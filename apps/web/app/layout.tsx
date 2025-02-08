import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@workspace/ui/components/toaster";
import "./globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "inDocify - AI-Powered Repository Documentation & Understanding",
  description:
    "Transform how you understand codebases with inDocify. Our AI-powered platform provides instant insights, real-time documentation, and comprehensive code analysis, helping developers save 70% of time in repository onboarding.",
  metadataBase: new URL("https://www.indocify.com"),
  openGraph: {
    title: "inDocify - AI-Powered Repository Documentation & Understanding",
    description:
      "Understand any repository instantly with AI-powered insights. Generate comprehensive documentation, get real-time explanations, and navigate complex codebases effortlessly.",
    url: "https://www.indocify.com",
    siteName: "inDocify",
    images: [
      {
        url: "https://www.indocify.com/opengraph.png", // Make sure to add your OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

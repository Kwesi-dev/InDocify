import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@workspace/ui/components/toaster";
import "./globals.css";
import Script from "next/script";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "inDocify - Code to Answers in Seconds - AI-Powered",
  description:
    "Transform how you understand codebases with inDocify. Our AI-powered platform provides instant insights, real-time documentation, and comprehensive code analysis, helping developers save 70% of time in repository onboarding.",
  metadataBase: new URL("https://www.indocify.com"),
  openGraph: {
    title: "inDocify - Code to Answers in Seconds - AI-Powered",
    description:
      "Navigate any repo, ask questions, and get AI-powered answers—no cloning needed, just instant insights.",
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
        {process.env.NODE_ENV === "production" ? (
          <Script
            type="text/javascript"
            id="ms-clarity-script"
            strategy="afterInteractive"
          >
            {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${process.env.CLARITY_ID}");
      `}
          </Script>
        ) : null}
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

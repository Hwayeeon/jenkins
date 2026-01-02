import "../../global.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "../components/analytics";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    default: "Davidson Rafael",
    template: "%s | Davidson Rafael",
  },
  description: "Informatics Engineering Student at UKRIDA | Web Developer",
  openGraph: {
    title: "Davidson Rafael",
    description: "Informatics Engineering Student at UKRIDA | Web Developer",
    url: "https://davidsonrafael.online",
    siteName: "Davidson Rafael",
    images: [
      {
        url: "https://davidsonrafael.online/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Davidson Rafael",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();
  
  return (
    <html lang={locale} className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dheereshag/coloured-icons@master/app/ci.min.css" />
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

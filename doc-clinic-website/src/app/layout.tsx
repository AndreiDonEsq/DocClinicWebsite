import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE_URL } from '@/lib/constants';

const font = GeistSans;

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Cabinet Medicină de Familie, București`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: 'Dr. Landa Danielescu - Cabinet Medicină de Familie',
    description: 'Îngrijire medicală dedicată pentru întreaga familie în București.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ro_RO',
    type: 'website',
  },
  // Twitter card metadata for better Twitter sharing
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Cabinet Medicină de Familie`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning={true}>
      <body className={`${font.className} bg-slate-50 text-slate-800 antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
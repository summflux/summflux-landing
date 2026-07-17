import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.summflux.com"),
  title: { default: "SummFlux | Inteligência comercial com Ary AI", template: "%s | SummFlux" },
  description: "Inteligência comercial para WhatsApp, Gmail e CRM.",
  icons: { icon: "/assets/icons/st-logo.png", apple: "/assets/icons/st-logo.png" },
  openGraph: { siteName: "SummFlux", locale: "pt_BR", type: "website" },
  robots: { index: true, follow: true }
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}

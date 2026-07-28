import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.summflux.com"),
  title: { default: "SummFlux RealityOS | Da conversa ao resultado", template: "%s | SummFlux" },
  description: "Conecte conversas, promessas, decisões, execução, cobrança e resultado com o RealityOS comercial da SummFlux e a Ary AI.",
  icons: { icon: "/assets/icons/st-logo.png", apple: "/assets/icons/st-logo.png" },
  openGraph: { siteName: "SummFlux", locale: "pt_BR", type: "website" },
  robots: { index: true, follow: true }
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}

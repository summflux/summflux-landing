import Script from "next/script";
import { landingHtml } from "../lib/landing-html";

const currentLandingHtml = landingHtml.replace(
  "Usuário adicional: R$ 29,90/mês, sob contratação comercial.",
  "Usuário adicional: R$ 29,90/mês, contratado pelo dashboard. Cada usuário cria a própria senha e recebe um workspace individual."
);

export default function LandingPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: currentLandingHtml }} />
      <Script src="/assets/js/app.js" strategy="afterInteractive" />
    </>
  );
}

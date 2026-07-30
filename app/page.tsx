import type { Metadata } from "next";
import { PublicFooter } from "../components/PublicFooter";
import { PublicHeader } from "../components/PublicHeader";
import { ArySection } from "../components/landing/ArySection";
import { CTASection } from "../components/landing/CTASection";
import { FAQSection } from "../components/landing/FAQSection";
import { GuardRealitySection } from "../components/landing/GuardRealitySection";
import { HeroSection } from "../components/landing/HeroSection";
import { HowItWorks } from "../components/landing/HowItWorks";
import { PricingSection } from "../components/landing/PricingSection";
import { ProductDemo } from "../components/landing/ProductDemo";
import { PromiseToCashSection } from "../components/landing/PromiseToCashSection";

export const metadata: Metadata = {
  title: "RealityOS comercial",
  description:
    "Conecte conversas, promessas, decisões, execução, cobrança e pagamento com o RealityOS da SummFlux e a Ary.",
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    <div className="public-site">
      <PublicHeader />
      <main>
        <HeroSection />
        <ProductDemo />
        <HowItWorks />
        <PromiseToCashSection />
        <ArySection />
        <GuardRealitySection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <PublicFooter />
    </div>
  );
}

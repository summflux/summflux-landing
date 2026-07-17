import Script from "next/script";
import { landingHtml } from "../lib/landing-html";
export default function LandingPage(){return <><div dangerouslySetInnerHTML={{__html:landingHtml}}/><Script src="/assets/js/app.js" strategy="afterInteractive"/></>}

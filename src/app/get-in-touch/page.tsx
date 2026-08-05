import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactNav from "@/components/contact/ContactNav";
import ContributeSection from "@/components/contact/ContributeSection";
import SectionDivider from "@/components/contact/SectionDivider";
import BackgroundPattern from "@/components/contact/BackgroundPattern";
import FooterCTA from "@/components/contact/FooterCTA";

export default function GetInTouchPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
        <BackgroundPattern />
      <ContactNav />

      <ContactHero />

      <SectionDivider number="01" title="Contact" />
      <ContactCards />

      <SectionDivider number="02" title="Contribute" />
      <ContributeSection />

      <SectionDivider number="03" title="Message" />
      <ContactForm />
      <FooterCTA />
    </main>
  );
}
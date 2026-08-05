import ContactHero from "@/components/contact/ContactHero";
import ContactNav from "@/components/contact/ContactNav";

export default function GetInTouchPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <ContactNav />
      <ContactHero />
    </main>
  );
}
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import WhyChooseUs from "@/components/why-choose-us";
import VisionSection from "@/components/vision-section";
import PartnersLogosSection from "@/components/partners-logos-section";
import MembershipsPreview from "@/components/memberships-preview";
import AccreditationSteps from "@/components/accreditation-steps";
import ServicePortalsPreview from "@/components/service-portals-preview";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <WhyChooseUs />
      <div className="section-divider" />
      <VisionSection />
      <div className="section-divider" />
      <PartnersLogosSection />
      <div className="section-divider" />
      <MembershipsPreview />
      <div className="section-divider" />
      <AccreditationSteps />
      <div className="section-divider" />
      <ServicePortalsPreview />
      <Footer />
    </main>
  );
}

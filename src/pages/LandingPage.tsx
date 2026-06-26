import {
  Benefits,
  Compare,
  ContactForm,
  FAQ,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  PainSolution,
  Security,
  TechHighlights,
  UseCases,
} from "@/components/landing";

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/*
        `enableScrollSpy` ativa o IntersectionObserver que destaca o link
        do menu correspondente à seção atualmente visível no viewport.
        Cada seção da landing precisa ter um `id` igual ao href do link
        (ex.: "#beneficios" -> id="beneficios")
      */}
      <Navbar enableScrollSpy />
      <main>
        <Hero />
        <PainSolution />
        <Benefits />
        <HowItWorks />
        {/* <VideoDemo /> */}
        <UseCases />
        <TechHighlights />
        <Security />
        <Compare />
        {/* <SocialProof /> */}
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}


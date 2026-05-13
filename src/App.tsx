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
  SocialProof,
  UseCases,
} from "@/components/landing";

function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <PainSolution />
        <Benefits />
        <HowItWorks />
        <UseCases />
        <Security />
        <Compare />
        <SocialProof />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

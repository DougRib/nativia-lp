import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { painSolutionItems } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function PainSolution() {
  return (
    <RevealSection className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Dor x Solução</p>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
            O custo invisível de não ter uma IA própria
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-border bg-border gap-px">
          {painSolutionItems.map((item) => (
            <div
              key={item.pain}
              className="grid gap-6 bg-background p-6 transition-colors hover:bg-card/40 sm:p-8 md:grid-cols-2"
            >
              <div className="flex gap-4">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Dor</p>
                  <p className="font-medium text-foreground">{item.pain}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-primary">NativIA</p>
                  <p className="font-medium text-foreground">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

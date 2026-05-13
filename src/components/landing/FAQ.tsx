import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function FAQ() {
  return (
    <RevealSection id="faq" className="border-t border-border bg-card/30 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Perguntas frequentes
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
            Respostas para áreas técnica e de negócio
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="faq-item group rounded-xl border border-border bg-card px-4 transition-colors hover:border-primary/40 sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-sm font-semibold sm:text-base">
                {item.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="faq-content">
                <p className="faq-content-inner pb-4 text-sm text-muted-foreground">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

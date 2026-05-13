import { socialMetrics, testimonials, trustedCompanies } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function SocialProof() {
  return (
    <RevealSection className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-4 sm:mb-16 sm:gap-6 md:grid-cols-4">
          {socialMetrics.map((metric) => (
            <article
              key={metric.label}
              className="card-hover rounded-2xl border border-border bg-card p-5 text-center sm:p-6"
            >
              <div className="mb-1 text-2xl font-bold text-gradient sm:text-3xl md:text-4xl">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </article>
          ))}
        </div>

        <p className="mb-6 text-center text-xs uppercase tracking-wider text-muted-foreground">
          Empresas que confiam na NativIA
        </p>
        <div className="mb-12 grid grid-cols-2 gap-3 opacity-60 sm:mb-16 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
          {trustedCompanies.map((company) => (
            <div
              key={company}
              className="grid h-14 place-items-center rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:opacity-100 sm:text-sm"
            >
              {company}
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-3 sm:gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.quote}
              className="card-glow card-hover rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <p className="mb-6 text-sm leading-relaxed text-foreground sm:text-base">
                "{testimonial.quote}"
              </p>
              <div className="text-sm">
                <p className="font-semibold">{testimonial.role}</p>
                <p className="text-muted-foreground">{testimonial.segment}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

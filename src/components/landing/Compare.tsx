import { Check, X } from "lucide-react";
import { compareRows } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function Compare() {
  return (
    <RevealSection className="border-t border-border bg-card/30 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Comparativo
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
            NativIA vs. IAs públicas
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[520px] text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border bg-background/40">
                <th className="p-3 text-left font-semibold sm:p-4">Critério</th>
                <th className="p-3 font-semibold text-primary sm:p-4">
                  NativIA
                </th>
                <th className="p-3 font-semibold text-muted-foreground sm:p-4">
                  IA pública
                </th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(([label, nativiaValue, publicValue]) => (
                <tr
                  key={label}
                  className="border-b border-border transition-colors hover:bg-background/40 last:border-0"
                >
                  <td className="p-3 text-foreground sm:p-4">{label}</td>
                  <td className="p-3 text-center sm:p-4">
                    {nativiaValue === true ? (
                      <Check className="inline h-5 w-5 text-primary" />
                    ) : (
                      <span className="text-muted-foreground">
                        {nativiaValue}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center sm:p-4">
                    {publicValue === false ? (
                      <X className="inline h-5 w-5 text-destructive" />
                    ) : (
                      <span className="text-muted-foreground">
                        {publicValue}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RevealSection>
  );
}

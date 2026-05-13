import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSessionHighlights } from "@/data/landing-content";
import { contactSchema } from "@/lib/contact-schema";
import { submitContactLead } from "@/services/contact-service";
import { RevealSection } from "@/components/ui/reveal-section";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
      setStatus("error");
      setFeedback(validation.error.issues[0]?.message ?? "Verifique os dados informados.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback(null);
      await submitContactLead(validation.data);
      setStatus("success");
      setFeedback("Solicitação enviada. Nosso time entrará em contato em até 1 dia útil.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Não foi possível enviar agora.");
    }
  }

  return (
    <RevealSection id="contato" className="relative overflow-hidden border-t border-border py-16 sm:py-24">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Demonstração</p>
          <h2 className="mb-5 text-2xl font-bold sm:text-3xl md:text-5xl">
            Veja a NativIA aplicada à sua operação
          </h2>
          <p className="mb-6 text-base text-muted-foreground sm:text-lg">
            Em até 45 minutos mostramos como sua empresa pode usar IA privada com segurança total
            e ROI mensurável.
          </p>

          <ul className="space-y-3 text-sm">
            {contactSessionHighlights.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-card-elevated sm:p-8"
          noValidate
        >
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" required maxLength={100} className="mt-1.5 bg-background" />
              </div>
              <div>
                <Label htmlFor="empresa">Empresa</Label>
                <Input id="empresa" name="empresa" required maxLength={100} className="mt-1.5 bg-background" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Input id="cargo" name="cargo" required maxLength={80} className="mt-1.5 bg-background" />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  maxLength={20}
                  className="mt-1.5 bg-background"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mail corporativo</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                maxLength={160}
                className="mt-1.5 bg-background"
              />
            </div>

            <div>
              <Label htmlFor="mensagem">Mensagem (opcional)</Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                maxLength={1000}
                rows={4}
                className="mt-1.5 bg-background"
              />
            </div>

            {feedback && (
              <p
                className={status === "success" ? "text-sm text-primary" : "text-sm text-destructive"}
                role={status === "error" ? "alert" : "status"}
              >
                {feedback}
              </p>
            )}

            <Button type="submit" size="lg" fullWidth disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Quero uma demonstração da NativIA"}
              {status !== "loading" && <ArrowRight className="h-4 w-4" />}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Ao enviar, você concorda com nossa política de privacidade.
            </p>
          </div>
        </form>
      </div>
    </RevealSection>
  );
}

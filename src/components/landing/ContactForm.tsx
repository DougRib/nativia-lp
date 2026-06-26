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

// Nomes dos campos do formulário — usar tipo derivado garante consistência
// entre o markup, os erros e o schema Zod (evita typos silenciosos).
type FieldName =
  | "nome"
  | "empresa"
  | "cargo"
  | "email"
  | "telefone"
  | "mensagem";
type FieldErrors = Partial<Record<FieldName, string>>;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  // Erros por campo permitem exibir feedback inline em todos os inputs inválidos
  // simultaneamente, em vez de mostrar apenas o primeiro erro do array.
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
      // Agrupa todos os erros do Zod por nome de campo. Apenas a primeira mensagem
      // de cada campo é exibida (UX padrão de formulários — menos ruído visual).
      const errors: FieldErrors = {};
      for (const issue of validation.error.issues) {
        const fieldName = issue.path[0];
        if (typeof fieldName === "string" && !errors[fieldName as FieldName]) {
          errors[fieldName as FieldName] = issue.message;
        }
      }

      setFieldErrors(errors);
      setStatus("error");
      setFeedback("Verifique os campos destacados e tente novamente.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback(null);
      setFieldErrors({});
      await submitContactLead(validation.data);
      setStatus("success");
      setFeedback(
        "Solicitação enviada. Nosso time entrará em contato em até 1 dia útil.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar agora.",
      );
    }
  }

  // Helper para gerar IDs únicos das mensagens de erro e ligar via aria-describedby.
  // Leitores de tela leem o erro associado quando o campo recebe foco.
  const errorId = (field: FieldName) => `${field}-error`;

  return (
    <RevealSection
      id="contato"
      className="relative overflow-hidden border-t border-border py-16 sm:py-24"
    >
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/*
          Em mobile/tablet (<lg) o bloco textual aparece acima do formulário —
          centralizamos para equilíbrio visual. A partir de lg o split horizontal
          retoma o alinhamento à esquerda.
        */}
        <div className="text-center lg:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Demonstração
          </p>
          <h2 className="mb-5 text-2xl font-bold sm:text-3xl md:text-5xl">
            Veja a NativIA aplicada à sua operação
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
            Em até 45 minutos mostramos como sua empresa pode usar IA privada
            com segurança total e ROI mensurável.
          </p>

          {/*
            Lista de bullets fica inline-block centralizado em mobile e volta
            ao bloco normal em lg+, preservando a leitura "alinhada à esquerda
            mas o conjunto centralizado" típica de blocos curtos.
          */}
          <ul className="mx-auto inline-block space-y-3 text-left text-sm lg:mx-0 lg:block">
            {contactSessionHighlights.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-card-elevated sm:p-8"
          noValidate
          aria-label="Formulário de agendamento de demonstração"
        >
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="nome">
                  Nome{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="mt-1.5 bg-background"
                  aria-invalid={Boolean(fieldErrors.nome)}
                  aria-describedby={
                    fieldErrors.nome ? errorId("nome") : undefined
                  }
                />
                {fieldErrors.nome && (
                  <p
                    id={errorId("nome")}
                    className="mt-1 text-xs text-destructive"
                  >
                    {fieldErrors.nome}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="empresa">
                  Empresa{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="empresa"
                  name="empresa"
                  required
                  maxLength={100}
                  autoComplete="organization"
                  className="mt-1.5 bg-background"
                  aria-invalid={Boolean(fieldErrors.empresa)}
                  aria-describedby={
                    fieldErrors.empresa ? errorId("empresa") : undefined
                  }
                />
                {fieldErrors.empresa && (
                  <p
                    id={errorId("empresa")}
                    className="mt-1 text-xs text-destructive"
                  >
                    {fieldErrors.empresa}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cargo">
                  Cargo{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="cargo"
                  name="cargo"
                  required
                  maxLength={80}
                  autoComplete="organization-title"
                  className="mt-1.5 bg-background"
                  aria-invalid={Boolean(fieldErrors.cargo)}
                  aria-describedby={
                    fieldErrors.cargo ? errorId("cargo") : undefined
                  }
                />
                {fieldErrors.cargo && (
                  <p
                    id={errorId("cargo")}
                    className="mt-1 text-xs text-destructive"
                  >
                    {fieldErrors.cargo}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="telefone">
                  Telefone{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  maxLength={20}
                  autoComplete="tel"
                  // inputMode="tel" abre o teclado numérico em iOS/Android
                  // mesmo quando o campo aceita formatação textual (parênteses, hífens).
                  inputMode="tel"
                  placeholder="(11) 99999-9999"
                  className="mt-1.5 bg-background"
                  aria-invalid={Boolean(fieldErrors.telefone)}
                  aria-describedby={
                    fieldErrors.telefone ? errorId("telefone") : undefined
                  }
                />
                {fieldErrors.telefone && (
                  <p
                    id={errorId("telefone")}
                    className="mt-1 text-xs text-destructive"
                  >
                    {fieldErrors.telefone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">
                E-mail corporativo{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                maxLength={160}
                autoComplete="email"
                inputMode="email"
                placeholder="voce@suaempresa.com.br"
                className="mt-1.5 bg-background"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? errorId("email") : undefined
                }
              />
              {fieldErrors.email && (
                <p
                  id={errorId("email")}
                  className="mt-1 text-xs text-destructive"
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="mensagem">Mensagem (opcional)</Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                maxLength={1000}
                rows={4}
                className="mt-1.5 bg-background"
                aria-invalid={Boolean(fieldErrors.mensagem)}
                aria-describedby={
                  fieldErrors.mensagem ? errorId("mensagem") : undefined
                }
              />
              {fieldErrors.mensagem && (
                <p
                  id={errorId("mensagem")}
                  className="mt-1 text-xs text-destructive"
                >
                  {fieldErrors.mensagem}
                </p>
              )}
            </div>

            {feedback && (
              <p
                className={
                  status === "success"
                    ? "text-sm text-primary"
                    : "text-sm text-destructive"
                }
                // role="alert" anuncia imediatamente para leitores de tela;
                // role="status" é usado em mensagens não-urgentes (sucesso).
                role={status === "error" ? "alert" : "status"}
                aria-live={status === "error" ? "assertive" : "polite"}
              >
                {feedback}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Enviando..."
                : "Quero uma demonstração da NativIA"}
              {status !== "loading" && (
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Ao enviar, você concorda com nossa{" "}
              <a
                href="/politica-de-privacidade"
                className="underline hover:text-foreground"
              >
                política de privacidade
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </RevealSection>
  );
}

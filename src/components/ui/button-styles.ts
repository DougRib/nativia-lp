import { cn } from "@/lib/cn";

// "gradient-border" usa a classe utilitária `.btn-gradient-border` definida em
// styles.css. A classe carrega toda a estética (borda cônica animada, hover
// radial fill, glow externo) — a variante apenas referencia o nome.
export type ButtonVariant = "primary" | "outline" | "ghost" | "gradient-border";
export type ButtonSize = "sm" | "md" | "lg";

type VariantOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90",
  outline: "border border-border bg-card/40 text-foreground hover:bg-card",
  ghost: "text-foreground hover:bg-card/60",
  "gradient-border": "btn-gradient-border text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-sm sm:text-base",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: VariantOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );
}

import { z } from "zod";

export const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  empresa: z.string().trim().min(2, "Informe a empresa").max(100),
  cargo: z.string().trim().min(2, "Informe seu cargo").max(80),
  email: z.string().trim().email("E-mail inválido").max(160),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  mensagem: z.string().trim().max(1000).optional(),
});

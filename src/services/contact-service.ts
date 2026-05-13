import type { ContactLead } from "@/types/contact";

function normalizePayload(payload: ContactLead) {
  return {
    ...payload,
    mensagem: payload.mensagem?.trim() || undefined,
  };
}

export async function submitContactLead(payload: ContactLead): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();

  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.info("[NativIA] lead capturado localmente", normalizePayload(payload));
      return;
    }
    throw new Error("Canal de contato indisponível no momento.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(normalizePayload(payload)),
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar sua solicitação. Tente novamente.");
  }
}

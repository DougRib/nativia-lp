import {
  Calculator,
  ClipboardCheck,
  Cpu,
  FileSearch,
  FolderOpen,
  Layers,
  Lock,
  MessageSquare,
  MessagesSquare,
  Mic,
  Network,
  Quote,
  ScrollText,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Upload,
  UserX,
  Users,
  Workflow,
  Zap,
  Download,
} from "lucide-react";

// Placeholder helper — troque pelas URLs reais (ou imports locais) quando tiver os screenshots.
// Marcador `TODO_IMG` facilita encontrar via busca depois.
const placeholder = (w: number, h: number, label: string) =>
  // TODO_IMG: substituir por screenshot real do sistema
  `https://placehold.co/${w}x${h}/0a0a0a/00d4ff?text=${encodeURIComponent(label)}`;

export const navLinks = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#demo", label: "Demo" },
  { href: "#casos", label: "Casos de uso" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#faq", label: "FAQ" },
] as const;

export const heroHighlights = [
  {
    icon: ShieldCheck,
    label: "Conformidade LGPD",
    description: "Privacidade e direitos do titular por design.",
  },
  {
    icon: Server,
    label: "Execução on-premise",
    description: "Roda na sua infraestrutura, com sua GPU.",
  },
  {
    icon: Lock,
    label: "Sem chamadas externas",
    description: "Nenhum dado sai do ambiente — modelos rodam localmente.",
  },
] as const;

export const painSolutionItems = [
  {
    pain: "Horas perdidas lendo contratos, laudos e relatórios",
    solution: "Análise automática com extração de dispositivos e pontos críticos em segundos",
  },
  {
    pain: "Risco de vazamento ao enviar dados para IAs públicas",
    solution: "Processamento 100% interno — nenhuma chamada para OpenAI, Google ou similares",
  },
  {
    pain: "Retrabalho manual e baixa rastreabilidade de decisões",
    solution: "Histórico auditável de cada consulta, resposta e usuário, com persistência por conversa",
  },
  {
    pain: "Falta de compartilhamento controlado entre times",
    solution: "Coleções compartilháveis com permissões granulares por usuário e notificações",
  },
] as const;

export const benefits = [
  {
    icon: Shield,
    title: "Segurança e privacidade total",
    description:
      "Dados, prompts e respostas permanecem dentro do seu perímetro corporativo. Zero envio para serviços externos.",
  },
  {
    icon: Server,
    title: "Implantação local / on-premise",
    description:
      "Stack containerizado: backend, banco, vetores e LLM rodam em servidores próprios ou nuvem dedicada.",
  },
  {
    icon: FileSearch,
    title: "5 modos de análise auto-detectados",
    description:
      "Documental, jurídica, financeira, dados tabulares e imagens — o sistema reconhece o tipo de arquivo e seleciona o pipeline ideal.",
  },
  {
    icon: Zap,
    title: "Ganho real de produtividade",
    description:
      "Reduz tarefas repetitivas de leitura/conferência e libera o time para decisões de maior valor.",
  },
  {
    icon: ClipboardCheck,
    title: "Governança e auditoria",
    description:
      "Logs detalhados de cada consulta, resposta e usuário, com histórico persistido por conversa.",
  },
  {
    icon: Workflow,
    title: "Integração corporativa real",
    description:
      "REST API, SSO via Keycloak (SAML/OIDC) e integração com diretórios LDAP/Active Directory.",
  },
] as const;

export const howItWorksSteps = [
  {
    icon: Upload,
    title: "1. Upload de documentos",
    description:
      "Envie PDFs, planilhas, contratos e imagens para o ambiente seguro da NativIA.",
  },
  {
    icon: FolderOpen,
    title: "2. Organize em coleções",
    description:
      "Agrupe por acervo e compartilhe com colegas com permissão controlada.",
  },
  {
    icon: Sparkles,
    title: "3. Análise com IA privada",
    description:
      "O sistema detecta o tipo de documento e ativa o modo correto: documental, jurídico, financeiro, dados ou imagem.",
  },
  {
    icon: MessageSquare,
    title: "4. Respostas e insights",
    description:
      "Receba resumos, cálculos, citações exatas de dispositivos e respostas fundamentadas nos seus documentos.",
  },
  {
    icon: Download,
    title: "5. Exporte resultados",
    description:
      "Baixe relatórios prontos ou integre as saídas aos seus sistemas internos via API.",
  },
] as const;

// Vídeo demo — você troca `videoSrc` pelo caminho do MP4 real depois.
// Mantenha o poster como capa (pode ser screenshot do sistema).
export const videoDemo = {
  eyebrow: "Demonstração",
  title: "Veja a NativIA em ação",
  description:
    "Um tour curto pelas principais análises e pelo fluxo de uso — do upload à resposta com citações.",
  // TODO_IMG: substituir pelo poster real (screenshot do sistema)
  posterUrl: placeholder(1280, 720, "NativIA — Demo"),
  // TODO_VIDEO: substituir pelo caminho do arquivo .mp4 (ex.: "/videos/demo.mp4")
  videoSrc: "",
  ctaLabel: "Solicitar demonstração ao vivo",
  ctaHref: "#contato",
} as const;

// Imports estáticos dos screenshots em WebP (convertidos via scripts/convert-images.mjs).
// Reduzimos ~70-80% do tamanho vs PNG mantendo qualidade visual praticamente idêntica.
// Vite gera URLs com hash para cache-busting e copia os arquivos para o build.
import loginShot from "@/assets/sistema/login.webp";
import interfaceShot from "@/assets/sistema/interface.webp";
import colecoesShot from "@/assets/sistema/colecoes.webp";
import chatShot from "@/assets/sistema/chat.webp";
import processandoShot from "@/assets/sistema/processando.webp";
import analiseImagemShot from "@/assets/sistema/analise-imagem.webp";

/**
 * Bento grid simétrico exibindo a jornada do usuário pelo sistema NativIA
 * com screenshots reais. O layout é "espelhado":
 *   - linha 1: [GRANDE col-span-2] [pequeno] [pequeno]
 *   - linha 2: [pequeno] [pequeno] [GRANDE col-span-2]
 * As células maiores (size: "lg") são posicionadas em diagonais opostas,
 * criando o efeito simétrico do bento grid da Aceternity.
 *
 * Ordem narrativa: login → interface → coleções → chat → processamento →
 * análise multimodal. Cada cartão expõe uma capacidade chave da plataforma.
 */
export const systemShowcase = [
  {
    image: interfaceShot,
    alt: "Tela inicial do NativIA mostrando histórico de conversas, documentos e chat com IA",
    eyebrow: "Hub central",
    title: "Assistente de IA empresarial",
    description:
      "Uma única tela reúne histórico de conversas, documentos da coleção ativa e chat com IA — tudo executando 100% on-premise.",
    size: "lg" as const,
  },
  {
    image: colecoesShot,
    alt: "Tela de coleções do NativIA com cards de diferentes acervos de documentos",
    eyebrow: "Organização",
    title: "Coleções compartilháveis",
    description:
      "Agrupe documentos por área e compartilhe com permissões granulares.",
    size: "sm" as const,
  },
  {
    image: chatShot,
    alt: "Chat do NativIA exibindo análise documental com tabela estruturada de resultados",
    eyebrow: "Análise documental",
    title: "Respostas estruturadas",
    description:
      "Tabelas, citações e referências do trecho exato — não só texto solto.",
    size: "sm" as const,
  },
  {
    image: processandoShot,
    alt: "Tela do NativIA mostrando o pipeline de processamento de uma análise em execução",
    eyebrow: "Pipeline transparente",
    title: "Cada etapa visível",
    description:
      "Validação, ingestão, análise multimodal — você vê tudo em tempo real.",
    size: "sm" as const,
  },
  {
    image: loginShot,
    alt: "Tela de login do Sistema IA Empresarial NativIA",
    eyebrow: "Acesso corporativo",
    title: "Autenticação SSO",
    description:
      "Login via Keycloak (SAML/OIDC) integrado a LDAP/AD da empresa.",
    size: "sm" as const,
  },
  {
    image: analiseImagemShot,
    alt: "Resultado da análise multimodal de imagem realizada pelo NativIA, com descrição visual detalhada",
    eyebrow: "Multimodal por padrão",
    title: "Visão computacional integrada",
    description:
      "OCR + análise de imagens e gráficos via Qwen-VL, no mesmo fluxo de chat dos documentos textuais. Zero envio para serviços externos.",
    size: "lg" as const,
  },
] as const;

// Por dentro da arquitetura — credibilidade técnica para CTOs/CIOs.
export const techHighlights = [
  {
    icon: Cpu,
    title: "LLM local em GPU",
    description:
      "Modelo avançado de Inteligência Artificial de código aberto rodando via Ollama em GPU NVIDIA. Sem dependência de OpenAI, Google ou Anthropic.",
  },
  {
    icon: Layers,
    title: "RAG híbrido avançado",
    description:
      "Embeddings semânticos (bge-m3, 1024-dim) + busca textual ranqueada (FTS PT-BR) + reranker neural (bge-reranker-v2-m3) — mais preciso em documentos densos.",
  },
  {
    icon: Calculator,
    title: "Determinístico no financeiro",
    description:
      "Holerites e extratos bancários são processados com extração estruturada — os valores não passam por geração de texto, eliminando alucinação numérica.",
  },
  {
    icon: Network,
    title: "Roteamento automático de tarefas",
    description:
      "O sistema reconhece o tipo de documento na ingestão e direciona para o pipeline ideal: documental, jurídico, financeiro, dados ou imagem.",
  },
  {
    icon: Mic,
    title: "Transcrição de áudio offline",
    description:
      "Whisper local para entrada por voz e transcrição de gravações sem enviar áudio para serviços externos.",
  },
  {
    icon: Sparkles,
    title: "Multimodal por padrão",
    description:
      "Qwen-VL para análise de imagens (OCR, descrição, gráficos) integrado ao mesmo fluxo de chat dos documentos textuais.",
  },
  {
    icon: Quote,
    title: "Citação de evidência em cada resposta",
    description:
      "Toda resposta vem com o trecho exato do documento que a fundamentou — pronto para auditoria, due diligence e validação humana.",
  },
  {
    icon: MessagesSquare,
    title: "Multi-arquivo e memória conversacional",
    description:
      "Pergunte sobre vários documentos ao mesmo tempo dentro de uma coleção e continue a conversa sem repetir o contexto — o histórico é persistido por conversa.",
  },
] as const;

export const securityItems = [
  {
    icon: ShieldCheck,
    title: "Conformidade LGPD",
    description: "Tratamento de dados alinhado às exigências legais brasileiras, com exclusão completa de conta a pedido.",
  },
  {
    icon: Lock,
    title: "Ambiente controlado",
    description: "Dados, modelos e índices vetoriais permanecem em infraestrutura definida pela sua empresa.",
  },
  {
    icon: Users,
    title: "Controle de acesso",
    description: "Permissões por usuário e grupo, com SSO via Keycloak (SAML/OIDC) e diretórios LDAP/AD.",
  },
  {
    icon: ScrollText,
    title: "Rastreabilidade total",
    description: "Logs detalhados de todas as interações para auditoria, com histórico persistido por conversa.",
  },
  {
    icon: UserX,
    title: "Direito ao esquecimento (LGPD)",
    description:
      "Exclusão completa de conta pelo próprio usuário via interface: remove conta, documentos, vetores, histórico e arquivos associados.",
  },
] as const;

export const securityTags = [
  "LGPD",
  "On-premise",
  "SSO/SAML/OIDC",
  "LDAP/AD",
  "Logs auditáveis",
  "TLS",
  "Zero envio externo",
] as const;

export const compareRows = [
  ["Dados permanecem na empresa", true, false],
  ["Execução on-premise / nuvem privada", true, false],
  ["Conformidade com LGPD por design", true, "Parcial"],
  ["Logs e auditoria completa de uso", true, false],
  ["Integração com SSO corporativo", true, false],
  ["Coleções compartilháveis com permissões", true, false],
  ["Sem uso dos seus dados para treinamento", true, "Somente em planos Enterprise"],
  ["Citação do trecho-fonte em cada resposta", true, false],
  ["Determinismo numérico em holerites e extratos", true, false],
  ["Exclusão completa de conta via UI (LGPD)", true, false],
] as const;

export const faqItems = [
  {
    question: "A NativIA realmente roda on-premise?",
    answer:
      "Sim. A NativIA pode ser implantada em servidores próprios, datacenter privado ou nuvem dedicada. Dados, prompts e respostas permanecem dentro do seu ambiente — não há chamadas para serviços externos durante a inferência.",
  },
  {
    question: "Quais modelos de IA são usados?",
    answer:
      "LLM: Qwen 3.5 9B (Ollama), rodando em GPU própria. Embeddings: BAAI/bge-m3 (multilíngue, 1024-dim). Reranker: BAAI/bge-reranker-v2-m3. OCR/Imagem: Qwen-VL. Transcrição de áudio: Whisper. Tudo executado localmente — sem dependência de OpenAI, Google ou Anthropic.",
  },
  {
    question: "Os dados são usados para treinar modelos?",
    answer:
      "Não. Nenhuma informação processada pela NativIA é utilizada para treinamento. Você mantém soberania total sobre os dados.",
  },
  {
    question: "Quanto tempo leva a implantação?",
    answer:
      "A maioria dos projetos entra em produção em até 30 dias, dependendo do escopo, integrações e infraestrutura disponível (incluindo GPU compatível).",
  },
  {
    question: "Quais formatos de arquivo são suportados?",
    answer:
      "PDF (com OCR automático quando necessário), DOCX, XLSX, CSV, TXT e imagens (PNG/JPG/WebP). Outros formatos podem ser habilitados conforme necessidade.",
  },
  {
    question: "Como funciona o controle de acesso?",
    answer:
      "A NativIA usa Keycloak com suporte a SSO (SAML/OIDC), integração com diretórios LDAP/Active Directory, perfis por área e auditoria detalhada de cada interação por usuário.",
  },
  {
    question: "Tem suporte a entrada por voz?",
    answer:
      "Sim. A transcrição é feita localmente pelo Whisper — sem enviar áudio para serviços externos.",
  },
  {
    question: "Como funciona a integração com nossos sistemas?",
    answer:
      "A NativIA expõe REST API e SSO corporativo. Conectores específicos (ERPs, CRMs, GED) podem ser desenvolvidos sob demanda durante a implantação.",
  },
  {
    question: "Quais são os requisitos de hardware?",
    answer:
      "A NativIA roda em servidor com GPU CUDA (NVIDIA, recomendado a partir de 16 GB de VRAM para o LLM principal), com RAM e armazenamento dimensionados ao volume de documentos. Os requisitos exatos são definidos no assessment técnico de implantação.",
  },
  {
    question: "Como funciona o OCR em PDFs digitalizados?",
    answer:
      "Para PDFs com baixa qualidade de texto extraível (digitalizações ou fotos), o OCR é ativado automaticamente durante a ingestão, sem necessidade de configuração. PDFs com texto nativo são processados diretamente para preservar fidelidade ao original.",
  },
  {
    question: "Vocês oferecem treinamento e suporte?",
    answer:
      "Sim. Toda implantação inclui treinamento das equipes-chave, materiais de uso e suporte técnico contínuo conforme o plano contratado.",
  },
  {
    question: "Como funciona o modelo de preços?",
    answer:
      "O investimento é definido por número de usuários, volume de processamento e tipo de implantação. Solicite uma proposta personalizada.",
  },
] as const;

export const contactSessionHighlights = [
  "Análise dos seus casos de uso prioritários",
  "Demonstração técnica ao vivo",
  "Plano sugerido de implantação",
] as const;

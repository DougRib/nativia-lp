import {
  Calculator,
  ClipboardCheck,
  Cog,
  FileSearch,
  FileImage,
  FolderOpen,
  Lock,
  MessageSquare,
  Scale,
  ScrollText,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Workflow,
  Zap,
  Download,
} from "lucide-react";

export const navLinks = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#casos", label: "Casos de uso" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#faq", label: "FAQ" },
] as const;

export const heroHighlights = [
  {
    icon: ShieldCheck,
    label: "Conformidade LGPD",
    description: "Privacidade e conformidade garantidas.",
  },
  {
    icon: Server,
    label: "Execução on-premise",
    description: "IA executada no seu ambiente interno.",
  },
  {
    icon: Lock,
    label: "Dados criptografados",
    description: "Proteção de ponta a ponta em todos os documentos.",
  },
] as const;

export const painSolutionItems = [
  {
    pain: "Horas perdidas lendo contratos, laudos e relatórios",
    solution: "Análise automática com extração de cláusulas e pontos críticos em segundos",
  },
  {
    pain: "Risco de vazamento ao enviar dados para IAs públicas",
    solution: "Processamento 100% interno — nada sai do seu ambiente",
  },
  {
    pain: "Retrabalho manual e baixa rastreabilidade de decisões",
    solution: "Histórico auditável de cada consulta, resposta e usuário",
  },
  {
    pain: "Falta de padronização entre áreas e equipes",
    solution: "Coleções e fluxos configuráveis por departamento",
  },
] as const;

export const benefits = [
  {
    icon: Shield,
    title: "Segurança e privacidade total",
    description: "Dados, prompts e respostas permanecem dentro do seu perímetro corporativo.",
  },
  {
    icon: Server,
    title: "Implantação local / on-premise",
    description: "Compatível com infraestrutura própria, datacenter privado ou nuvem dedicada.",
  },
  {
    icon: FileSearch,
    title: "Modos especializados de análise",
    description:
      "Use análises jurídica, financeira, OCR, imagens e dados para respostas mais precisas por contexto.",
  },
  {
    icon: Zap,
    title: "Ganho real de produtividade",
    description: "Reduza tarefas repetitivas e libere o time para decisões de maior valor.",
  },
  {
    icon: ClipboardCheck,
    title: "Governança e auditoria",
    description: "Logs completos por usuário, área e documento. Pronto para auditoria interna.",
  },
  {
    icon: Workflow,
    title: "Integração com seu fluxo",
    description: "Conecte a sistemas existentes via API, SSO corporativo e diretórios internos.",
  },
] as const;

export const howItWorksSteps = [
  {
    icon: Upload,
    title: "1. Upload de documentos",
    description: "Envie PDFs, planilhas, contratos e demais arquivos para o ambiente seguro da NativIA.",
  },
  {
    icon: FolderOpen,
    title: "2. Selecione coleção e tarefa",
    description: "Organize por área, acervo e nível de acesso antes de iniciar a análise.",
  },
  {
    icon: Sparkles,
    title: "3. Análise com IA privada",
    description: "A NativIA executa internamente no modo ideal para o tipo de documento e objetivo.",
  },
  {
    icon: MessageSquare,
    title: "4. Respostas e insights",
    description: "Receba resumos, comparações, riscos e respostas com base nos seus documentos.",
  },
  {
    icon: Download,
    title: "5. Exporte resultados",
    description: "Baixe relatórios prontos ou integre as saídas aos seus sistemas internos.",
  },
] as const;

export const useCases = [
  {
    icon: Scale,
    area: "Jurídico",
    description: "Leituras críticas e respostas rápidas para documentos legais sensíveis.",
    items: [
      "Análise de contratos e cláusulas críticas",
      "Comparativo entre versões e minutas",
      "Sumarização de processos e pareceres",
    ],
  },
  {
    icon: FileImage,
    area: "Arquivos e Imagens",
    description: "Interpretação inteligente de acervos visuais e documentos não estruturados.",
    items: [
      "OCR em imagens, PDFs digitalizados e scans",
      "Classificação automática por coleção, tipo e assunto",
      "Extração de dados-chave de arquivos visuais em lote",
    ],
  },
  {
    icon: Calculator,
    area: "Financeiro",
    description: "Apoio analítico para documentos financeiros com rastreabilidade.",
    items: [
      "Leitura automática de notas e contratos",
      "Identificação de cláusulas de risco financeiro",
      "Apoio em auditorias e fechamentos",
    ],
  },
  {
    icon: Cog,
    area: "Operações & Administrativo",
    description: "Acesso rápido ao conhecimento operacional para reduzir retrabalho.",
    items: [
      "Padronização de procedimentos",
      "Consulta inteligente em manuais e POPs",
      "Geração de relatórios executivos",
    ],
  },
] as const;

export const securityItems = [
  {
    icon: ShieldCheck,
    title: "Conformidade LGPD",
    description: "Tratamento de dados alinhado às exigências legais brasileiras.",
  },
  {
    icon: Lock,
    title: "Ambiente controlado",
    description: "Dados permanecem em infraestrutura definida pela sua empresa.",
  },
  {
    icon: Users,
    title: "Controle de acesso",
    description: "Permissões por usuário, grupo e área com integração SSO.",
  },
  {
    icon: ScrollText,
    title: "Rastreabilidade total",
    description: "Logs detalhados de todas as interações para auditoria.",
  },
] as const;

export const securityTags = [
  "LGPD",
  "ISO-ready",
  "On-premise",
  "SSO/SAML",
  "Logs auditáveis",
] as const;

export const compareRows = [
  ["Dados permanecem na empresa", true, false],
  ["Execução on-premise / nuvem privada", true, false],
  ["Conformidade com LGPD por design", true, "Parcial"],
  ["Logs e auditoria completa de uso", true, false],
  ["Integração com SSO corporativo", true, false],
  ["Coleções por área e governança", true, false],
  ["Sem treinamento com seus dados", true, "Depende do plano"],
] as const;

export const socialMetrics = [
  { value: "+60%", label: "Redução em tempo de leitura documental" },
  { value: "100%", label: "dos dados permanecem na infraestrutura da empresa" },
  { value: "4x", label: "Mais respostas atendidas pelo time" },
  { value: "<30 dias", label: "Tempo médio de implantação" },
] as const;

export const trustedCompanies = [
  "ACME Corp",
  "NorthBank",
  "LegalTech BR",
  "GrupoSigma",
  "Vector S.A.",
] as const;

export const testimonials = [
  {
    quote:
      "Reduzimos em mais de 60% o tempo de análise de contratos no jurídico, mantendo total controle sobre os dados.",
    role: "Diretor Jurídico",
    segment: "Indústria nacional",
  },
  {
    quote:
      "Implantamos a NativIA on-premise em poucas semanas. A equipe de TI ganhou previsibilidade e as áreas de operação aceleraram análises documentais.",
    role: "CIO",
    segment: "Grupo de serviços",
  },
  {
    quote:
      "Pela primeira vez consigo usar IA em documentos sensíveis sem violar políticas internas de segurança.",
    role: "Head de Compliance",
    segment: "Setor financeiro",
  },
] as const;

export const faqItems = [
  {
    question: "A NativIA realmente roda on-premise?",
    answer:
      "Sim. A NativIA pode ser implantada em servidores próprios, datacenter privado ou nuvem dedicada. Os dados, prompts e respostas permanecem dentro do seu ambiente.",
  },
  {
    question: "Os dados são usados para treinar modelos?",
    answer:
      "Não. Nenhuma informação processada pela NativIA é utilizada para treinamento de modelos externos. Você mantém soberania total sobre os dados.",
  },
  {
    question: "Quanto tempo leva a implantação?",
    answer:
      "A maioria dos clientes está em produção em menos de 30 dias, dependendo do escopo, integrações e infraestrutura disponível.",
  },
  {
    question: "Quais formatos de arquivo são suportados?",
    answer:
      "PDF, DOCX, XLSX, CSV, TXT, e-mails e imagens com OCR. Outros formatos podem ser habilitados conforme necessidade.",
  },
  {
    question: "Como funciona o controle de acesso?",
    answer:
      "A NativIA suporta SSO (SAML/OIDC), perfis por área e auditoria detalhada de cada interação por usuário.",
  },
  {
    question: "Vocês oferecem treinamento e suporte?",
    answer:
      "Sim. Toda implantação inclui treinamento das equipes-chave, materiais de uso e suporte técnico contínuo conforme o plano contratado.",
  },
  {
    question: "Como funciona o modelo de preços?",
    answer:
      "O investimento é definido conforme número de usuários, volume de processamento e tipo de implantação. Solicite uma proposta personalizada.",
  },
  {
    question: "É possível integrar com nossos sistemas internos?",
    answer:
      "Sim. A NativIA disponibiliza APIs e conectores para integração com ERPs, CRMs, sistemas de gestão documental e diretórios corporativos.",
  },
] as const;

export const contactSessionHighlights = [
  "Análise dos seus casos de uso prioritários",
  "Demonstração técnica ao vivo",
  "Plano sugerido de implantação",
] as const;

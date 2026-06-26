export type LegalPath =
  | "/sobre"
  | "/politica-de-privacidade"
  | "/termos-de-uso"
  | "/lgpd";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
};

export type LegalDocument = {
  path: LegalPath;
  navLabel: string;
  title: string;
  lead: string;
  updatedAt: string;
  sections: LegalSection[];
};

export const legalDocuments: Record<LegalPath, LegalDocument> = {
  "/sobre": {
    path: "/sobre",
    navLabel: "Sobre",
    title: "Sobre a NativIA",
    lead:
      "A NativIA é uma plataforma de inteligência artificial corporativa desenvolvida para empresas que precisam extrair valor de documentos sensíveis com alto padrão de segurança, governança e privacidade.",
    updatedAt: "28 de maio de 2026",
    sections: [
      {
        title: "Quem somos",
        paragraphs: [
          "Somos uma empresa de tecnologia focada em soluções de IA para ambientes empresariais. Nosso objetivo é tornar o uso de inteligência artificial viável em organizações que exigem controle técnico, conformidade regulatória e previsibilidade operacional.",
          "Atuamos com uma abordagem consultiva e técnica, apoiando times de TI, jurídico, compliance, operações e áreas de negócio na adoção segura de IA aplicada a processos documentais.",
        ],
      },
      {
        title: "O que entregamos",
        paragraphs: [
          "A NativIA permite organizar arquivos em coleções compartilháveis, processar documentos em múltiplos formatos e conversar com o conteúdo por meio de chat com IA. A plataforma oferece resumos, respostas contextualizadas, análises e extração estruturada de informações com citação do trecho.",
          "São cinco modos de análise auto-detectáveis — documental, jurídico, financeiro, dados tabulares e imagens — em que o sistema reconhece o tipo de arquivo na ingestão e ativa o pipeline mais adequado a ele.",
          "Para holerites/contracheques e extratos bancários, adotamos uma extração determinística: os valores são lidos diretamente da estrutura do documento, sem passar pela geração de texto da IA, eliminando o risco de alucinação numérica em consultas financeiras.",
        ],
      },
      {
        title: "Diferencial de arquitetura",
        paragraphs: [
          "Nossa arquitetura é projetada para execução local/on-premise. Todos os modelos — LLM, embeddings, reranker, transcrição de áudio e análise de imagem — rodam dentro do ambiente do cliente, em GPU própria, sem chamadas para serviços públicos de IA.",
          "Utilizamos modelos open-source de referência (família Qwen para LLM e VL, BAAI bge-m3 para embeddings, bge-reranker-v2-m3 para re-ranqueamento e Whisper para áudio), o que garante reprodutibilidade, auditabilidade e independência tecnológica.",
          "Isso permite que cada empresa preserve soberania sobre sua informação, adote controles internos de segurança e cumpra requisitos de privacidade de forma consistente com sua política corporativa — inclusive em cenários em que nem o tráfego de inferência sai do perímetro da rede.",
        ],
      },
      {
        title: "Compromisso com clientes",
        paragraphs: [
          "Trabalhamos com implantação estruturada, integração com sistemas corporativos, controles de acesso e trilhas de auditoria, com foco em estabilidade e evolução contínua.",
          "Nosso compromisso é entregar resultados mensuráveis de produtividade sem comprometer segurança, confidencialidade e conformidade legal.",
        ],
      },
    ],
  },
  "/politica-de-privacidade": {
    path: "/politica-de-privacidade",
    navLabel: "Privacidade",
    title: "Política de Privacidade",
    lead:
      "Esta Política de Privacidade explica como a NativIA trata dados pessoais em seus canais institucionais e na prestação dos serviços de plataforma corporativa, em conformidade com a Lei nº 13.709/2018 (LGPD).",
    updatedAt: "28 de maio de 2026",
    sections: [
      {
        title: "1. Escopo desta política",
        paragraphs: [
          "Esta política se aplica ao tratamento de dados pessoais realizado pela NativIA em seu site institucional, formulários de contato, demonstrações comerciais, suporte e operação da plataforma.",
          "O tratamento pode variar conforme o tipo de relação com a NativIA, como visitante do site, lead comercial, cliente corporativo, usuário autorizado do cliente, fornecedor ou parceiro.",
        ],
      },
      {
        title: "2. Categorias de dados tratados",
        paragraphs: [
          "Podemos tratar dados de identificação e contato, como nome, e-mail corporativo, telefone, empresa, cargo e registros de interação comercial.",
          "Na plataforma, podem ser tratados dados enviados pelo cliente por meio de documentos, arquivos, metadados, históricos de consulta e logs de uso necessários para segurança, rastreabilidade e continuidade do serviço.",
        ],
      },
      {
        title: "3. Finalidades e bases legais",
        paragraphs: [
          "Tratamos dados para viabilizar contato comercial, demonstrações, prestação do serviço contratado, suporte técnico, melhoria de desempenho, cumprimento de obrigações legais e proteção contra uso indevido.",
          "As bases legais incluem execução de contrato e procedimentos preliminares, cumprimento de obrigação legal ou regulatória, legítimo interesse com avaliação de impacto e, quando aplicável, consentimento.",
        ],
      },
      {
        title: "4. Compartilhamento de dados",
        paragraphs: [
          "A NativIA não comercializa dados pessoais. O compartilhamento ocorre somente quando necessário para executar obrigações contratuais, atender exigências legais ou operar serviços de suporte com segurança.",
          "Prestadores que atuam em nosso nome são contratualmente obrigados a observar requisitos de confidencialidade, segurança da informação e proteção de dados.",
        ],
      },
      {
        title: "5. Retenção e descarte",
        paragraphs: [
          "Os dados são mantidos pelo período necessário para atender às finalidades informadas, ao ciclo contratual e às obrigações legais ou regulatórias aplicáveis.",
          "Encerrada a necessidade legítima de retenção, os dados são eliminados ou anonimizados por procedimentos técnicos compatíveis com a natureza do tratamento.",
        ],
      },
      {
        title: "6. Segurança da informação",
        paragraphs: [
          "Adotamos controles técnicos e administrativos para proteger dados pessoais contra acessos não autorizados, perda, destruição, alteração ou qualquer forma de tratamento inadequado.",
          "Entre os controles aplicados, destacam-se: criptografia de comunicações em trânsito (TLS), autenticação por SSO via Keycloak (com suporte a SAML/OIDC) integrada a diretórios corporativos LDAP/Active Directory, gestão de permissões por usuário e grupo, trilhas de auditoria com persistência de histórico por conversa, segregação de ambientes, monitoramento de eventos e políticas internas de segurança da informação.",
          "Quando a plataforma é implantada em modelo on-premise, o tratamento dos documentos do cliente ocorre integralmente dentro do perímetro de rede dele — a NativIA não acessa nem processa esses conteúdos remotamente.",
        ],
      },
      {
        title: "7. Direitos do titular",
        paragraphs: [
          "Nos termos da LGPD, o titular pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento e revisão de decisões automatizadas quando aplicável.",
          "Para titulares cadastrados como usuários da plataforma, disponibilizamos um fluxo de exclusão completa de conta diretamente na interface do produto, que remove conta, documentos enviados, índices vetoriais, histórico de conversas e arquivos associados.",
          "Demais solicitações podem ser encaminhadas pelos canais oficiais de privacidade. Poderemos solicitar validação de identidade para prevenir fraudes e proteger terceiros.",
        ],
      },
      {
        title: "8. Cookies e tecnologias similares",
        paragraphs: [
          "Nossos canais podem utilizar cookies técnicos, analíticos e de segurança para funcionamento adequado, medição de desempenho e prevenção de incidentes.",
          "Quando aplicável, o usuário poderá gerenciar preferências por meio do navegador ou de mecanismos de consentimento disponibilizados.",
        ],
      },
      {
        title: "9. Atualizações desta política",
        paragraphs: [
          "Esta política pode ser atualizada para refletir alterações legais, regulatórias, contratuais ou operacionais. A versão vigente será sempre publicada nesta página com a respectiva data de atualização.",
        ],
      },
      {
        title: "10. Canal de privacidade",
        paragraphs: [
          "Para dúvidas, solicitações relacionadas a dados pessoais ou exercício de direitos previstos na LGPD, utilize nossos canais oficiais de atendimento.",
        ],
        bulletPoints: [
          "E-mail: privacidade@nativia.com.br",
          "E-mail geral: contato@nativia.com.br",
        ],
      },
    ],
  },
  "/termos-de-uso": {
    path: "/termos-de-uso",
    navLabel: "Termos de Uso",
    title: "Termos de Uso",
    lead:
      "Estes Termos de Uso disciplinam o acesso e a utilização dos canais institucionais e da plataforma NativIA, estabelecendo direitos, deveres e responsabilidades entre as partes.",
    updatedAt: "28 de maio de 2026",
    sections: [
      {
        title: "1. Aceite",
        paragraphs: [
          "Ao acessar ou utilizar a NativIA, o usuário declara que leu e concorda com estes Termos de Uso e com a Política de Privacidade vigente.",
          "Caso não concorde com qualquer disposição destes termos, o usuário deve interromper o uso imediatamente.",
        ],
      },
      {
        title: "2. Objeto do serviço",
        paragraphs: [
          "A NativIA oferece recursos de organização, processamento e análise inteligente de documentos corporativos, com funcionalidades de chat, sumarização, extração de informações e modos especializados.",
          "O escopo funcional contratado pode variar de acordo com o plano, a arquitetura de implantação e as integrações acordadas com cada cliente.",
        ],
      },
      {
        title: "3. Acesso e credenciais",
        paragraphs: [
          "O acesso à plataforma exige autenticação. Suportamos credenciais corporativas via SSO (SAML/OIDC através do Keycloak) e integração com diretórios LDAP/Active Directory, além de outros mecanismos definidos em contrato.",
          "O usuário é responsável por manter a confidencialidade de suas credenciais e por toda atividade realizada em sua conta ou ambiente autorizado.",
        ],
      },
      {
        title: "4. Uso permitido e conduta",
        paragraphs: [
          "O uso deve observar a legislação aplicável, políticas internas da organização contratante e regras de segurança da informação.",
          "É proibido utilizar a plataforma para práticas ilícitas, tentativa de violação de sistemas, engenharia reversa não autorizada, disseminação de malware ou qualquer atividade que comprometa a integridade do serviço.",
        ],
      },
      {
        title: "5. Propriedade intelectual",
        paragraphs: [
          "A titularidade da plataforma, de sua arquitetura, códigos, marcas, interfaces e materiais de apoio pertence à NativIA ou a seus licenciadores.",
          "É vedada a reprodução, distribuição ou exploração não autorizada desses elementos, salvo autorização expressa por escrito.",
        ],
      },
      {
        title: "6. Disponibilidade e suporte",
        paragraphs: [
          "A NativIA adota práticas para garantir disponibilidade e desempenho compatíveis com ambiente corporativo, respeitadas as limitações técnicas e eventos fora de controle razoável.",
          "Níveis de serviço, janelas de manutenção, suporte e tempos de atendimento são definidos contratualmente.",
        ],
      },
      {
        title: "7. Limitação de responsabilidade",
        paragraphs: [
          "A NativIA disponibiliza tecnologia de apoio à análise e decisão, não substituindo validação técnica, jurídica ou de negócio por profissionais responsáveis do cliente.",
          "O módulo financeiro (holerites e extratos bancários) utiliza extração determinística de valores diretamente da estrutura do documento, com rastreabilidade interna. Os demais módulos — análise documental, jurídica, de dados tabulares e de imagens — combinam recuperação semântica/lexical com modelos generativos, que estão sujeitos a imprecisões ocasionais e podem requerer validação humana antes do uso para fins decisórios.",
          "Na extensão permitida por lei e contrato, não nos responsabilizamos por danos indiretos, lucros cessantes ou perdas decorrentes de uso inadequado, integração de terceiros ou descumprimento de obrigações pelo usuário.",
        ],
      },
      {
        title: "8. Suspensão e encerramento",
        paragraphs: [
          "Podemos suspender ou restringir acessos em caso de violação destes termos, risco de segurança, determinação legal ou inadimplência contratual, observadas as condições aplicáveis.",
          "O encerramento do uso seguirá regras contratuais de transição, exportação e descarte de dados, quando aplicável.",
        ],
      },
      {
        title: "9. Alterações e vigência",
        paragraphs: [
          "Estes termos podem ser atualizados periodicamente para refletir evolução do serviço, requisitos legais ou ajustes operacionais.",
          "A versão vigente será publicada com data de atualização. O uso continuado após mudanças representa concordância com os termos atualizados.",
        ],
      },
      {
        title: "10. Lei aplicável e foro",
        paragraphs: [
          "Estes Termos de Uso são regidos pela legislação brasileira. Fica eleito o foro da comarca da sede da NativIA, salvo disposição legal específica em contrário.",
        ],
      },
    ],
  },
  "/lgpd": {
    path: "/lgpd",
    navLabel: "LGPD",
    title: "Programa LGPD e Proteção de Dados",
    lead:
      "A NativIA adota um programa contínuo de privacidade e proteção de dados para assegurar conformidade com a LGPD, reduzir riscos e fortalecer a confiança no uso corporativo de inteligência artificial.",
    updatedAt: "28 de maio de 2026",
    sections: [
      {
        title: "1. Compromisso institucional",
        paragraphs: [
          "Privacidade e segurança são princípios estruturantes do produto e da operação. Nosso programa considera requisitos legais, políticas internas e melhores práticas de governança de dados.",
          "A conformidade é tratada como processo contínuo, com revisão periódica de controles, processos e responsabilidades.",
        ],
      },
      {
        title: "2. Papéis de tratamento",
        paragraphs: [
          "Dependendo do contexto, a NativIA pode atuar como controladora de dados relacionados a seus canais institucionais e como operadora em tratamentos realizados em nome de clientes corporativos.",
          "As responsabilidades de cada parte são formalizadas em instrumentos contratuais e anexos de proteção de dados.",
        ],
      },
      {
        title: "3. Princípios aplicados",
        paragraphs: [
          "Nossas atividades de tratamento observam os princípios de finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização.",
        ],
      },
      {
        title: "4. Medidas técnicas e organizacionais",
        paragraphs: [
          "Adotamos controles de acesso por usuário e grupo, segregação de ambientes, criptografia de comunicações em trânsito (TLS), trilhas de auditoria com persistência por conversa, monitoramento de eventos, gestão de vulnerabilidades e políticas internas de segurança da informação.",
          "A autenticação utiliza Keycloak com SSO (SAML/OIDC) e integração com diretórios LDAP/Active Directory. Os modelos de IA — LLM, embeddings, reranker, OCR/imagem e transcrição de áudio — rodam localmente na infraestrutura do cliente, sem chamadas para serviços públicos de IA durante a inferência.",
          "A plataforma oferece um fluxo de exclusão completa de conta diretamente na interface, que remove dados pessoais, documentos enviados, índices vetoriais, histórico de conversas e arquivos do usuário.",
          "Também realizamos treinamentos internos, revisão de perfis de acesso e avaliação de fornecedores com impacto em dados pessoais.",
        ],
      },
      {
        title: "5. Direitos dos titulares e atendimento",
        paragraphs: [
          "Mantemos processo dedicado para recebimento e tratamento de solicitações de titulares, em conformidade com os direitos previstos na LGPD.",
          "As demandas são tratadas com critérios de autenticidade, rastreabilidade, prazo e proporcionalidade, respeitando limites legais e contratuais.",
        ],
      },
      {
        title: "6. Gestão de incidentes",
        paragraphs: [
          "Possuímos fluxo interno para identificação, contenção, investigação e resposta a incidentes de segurança com potencial impacto em dados pessoais.",
          "Quando exigido por lei, adotamos comunicação aos envolvidos e autoridades competentes, incluindo medidas de mitigação e melhoria contínua.",
        ],
      },
      {
        title: "7. Relacionamento com clientes e parceiros",
        paragraphs: [
          "Nos contratos com clientes e parceiros, definimos cláusulas de proteção de dados, confidencialidade, segurança e cooperação para atendimento a direitos de titulares e obrigações regulatórias.",
          "Para integrações e operações conjuntas, avaliamos riscos e estabelecemos controles proporcionais à criticidade do tratamento.",
        ],
      },
      {
        title: "8. Canal de privacidade e encarregado",
        paragraphs: [
          "Em atendimento ao art. 41 da LGPD, a NativIA indica seu Encarregado pelo Tratamento de Dados Pessoais (DPO), responsável por intermediar comunicações com titulares e com a Autoridade Nacional de Proteção de Dados.",
          "Dúvidas sobre tratamento de dados, solicitações de titulares e comunicações relacionadas à LGPD podem ser encaminhadas pelos canais oficiais abaixo.",
        ],
        bulletPoints: [
          // TODO_DPO: substituir pelo nome do Encarregado/DPO nomeado pela empresa (LGPD art. 41 §1º)
          "Encarregado (DPO): [a ser preenchido]",
          "E-mail de privacidade: privacidade@nativia.com.br",
          "E-mail de atendimento: contato@nativia.com.br",
        ],
      },
    ],
  },
};

export const legalNavigation = [
  { href: "/sobre", label: "Sobre" },
  { href: "/politica-de-privacidade", label: "Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/lgpd", label: "LGPD" },
] as const;
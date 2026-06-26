import { useEffect, useState } from "react";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { legalDocuments, type LegalPath } from "@/data/legal-content";
import { LandingPage } from "@/pages/LandingPage";
import { LegalDocumentPage } from "@/pages/LegalDocumentPage";

/**
 * Normaliza o pathname removendo a barra final, exceto na raiz "/".
 * Mantém o conjunto de chaves em `legalDocuments` consistente
 * (evita que "/lgpd" e "/lgpd/" sejam tratadas como rotas distintas).
 */
function normalizePath(pathname: string): string {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function isLegalPath(path: string): path is LegalPath {
  return path in legalDocuments;
}

/**
 * Lê o pathname atual do navegador de forma segura para SSR/build estático.
 * No browser usa `window.location.pathname`; fora dele cai em "/".
 */
function getCurrentPath(): string {
  if (typeof window === "undefined") {
    return "/";
  }
  return normalizePath(window.location.pathname);
}

function App() {
  // Estado reativo para o pathname — antes era lido apenas no mount,
  // o que quebrava a navegação via botões "voltar"/"avançar" do navegador.
  const [currentPath, setCurrentPath] = useState<string>(getCurrentPath);

  useEffect(() => {
    // popstate dispara quando o usuário navega no histórico (voltar/avançar)
    // ou quando outro código chama history.back()/forward(). Sem este listener,
    // a SPA não re-renderiza ao mudar de URL pelo histórico.
    function handlePopState() {
      setCurrentPath(getCurrentPath());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const isInstitutionalPage = isLegalPath(currentPath);

  return (
    <>
      {isInstitutionalPage ? <LegalDocumentPage path={currentPath} /> : <LandingPage />}
      <ScrollToTopButton />
    </>
  );
}

export default App;

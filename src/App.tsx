import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { legalDocuments, type LegalPath } from "@/data/legal-content";
import { LandingPage } from "@/pages/LandingPage";
import { LegalDocumentPage } from "@/pages/LegalDocumentPage";

function normalizePath(pathname: string): string {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function isLegalPath(path: string): path is LegalPath {
  return path in legalDocuments;
}

function App() {
  const currentPath = normalizePath(window.location.pathname);
  const isInstitutionalPage = isLegalPath(currentPath);

  return (
    <>
      {isInstitutionalPage ? <LegalDocumentPage path={currentPath} /> : <LandingPage />}
      <ScrollToTopButton />
    </>
  );
}

export default App;

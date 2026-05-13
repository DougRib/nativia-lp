import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { legalDocuments, type LegalPath } from "@/data/legal-content";

type LegalDocumentPageProps = {
  path: LegalPath;
};

export function LegalDocumentPage({ path }: LegalDocumentPageProps) {
  return <LegalPageLayout document={legalDocuments[path]} />;
}


import type { Metadata } from "next";
import { pageCopy } from "@/content/site";
import { SubPageLayout } from "@/components/SubPageLayout";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata("curriculum", "/curriculum");

export default function CurriculumPage() {
  return <SubPageLayout page={pageCopy.curriculum} />;
}

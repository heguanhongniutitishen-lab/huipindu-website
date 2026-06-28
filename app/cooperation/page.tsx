import type { Metadata } from "next";
import { pageCopy } from "@/content/site";
import { SubPageLayout } from "@/components/SubPageLayout";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata("cooperation", "/cooperation");

export default function CooperationPage() {
  return <SubPageLayout page={pageCopy.cooperation} />;
}

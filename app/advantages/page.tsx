import type { Metadata } from "next";
import { pageCopy } from "@/content/site";
import { SubPageLayout } from "@/components/SubPageLayout";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata("advantages", "/advantages");

export default function AdvantagesPage() {
  return <SubPageLayout page={pageCopy.advantages} />;
}

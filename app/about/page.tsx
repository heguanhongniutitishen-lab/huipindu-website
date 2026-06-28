import type { Metadata } from "next";
import { pageCopy } from "@/content/site";
import { SubPageLayout } from "@/components/SubPageLayout";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata("about", "/about");

export default function AboutPage() {
  return <SubPageLayout page={pageCopy.about} />;
}

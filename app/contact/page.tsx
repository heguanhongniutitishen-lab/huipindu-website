import type { Metadata } from "next";
import { pageCopy } from "@/content/site";
import { SubPageLayout } from "@/components/SubPageLayout";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata("contact", "/contact");

export default function ContactPage() {
  return <SubPageLayout page={pageCopy.contact} />;
}

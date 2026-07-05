import { NextResponse } from "next/server";
import {
  listLocalCases,
  listLocalCmsSections,
  listLocalDemoVideos,
  listLocalFaqs,
  listLocalPricingPlans,
  listLocalSettings
} from "@/lib/admin/local-db";

export async function GET() {
  const [pricingPlans, cases, cmsSections, faqs, demoVideos, settings] = await Promise.all([
    listLocalPricingPlans(),
    listLocalCases(),
    listLocalCmsSections(),
    listLocalFaqs(),
    listLocalDemoVideos(),
    listLocalSettings()
  ]);

  return NextResponse.json({
    data: {
      pricingPlans,
      cases,
      cmsSections,
      faqs,
      demoVideos,
      settings
    }
  });
}

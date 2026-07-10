import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { defaultSiteConfig, type SiteConfig } from "@/lib/site-config";

const dbDir = path.join(process.cwd(), ".data");
const configPath = path.join(dbDir, "site-config.json");
const siteConfigKey = "website.siteConfig";

function canUseDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export async function readSiteConfig(): Promise<SiteConfig> {
  if (canUseDatabase()) {
    try {
      const row = await prisma.siteSetting.findUnique({ where: { key: siteConfigKey } });
      if (row?.value) {
        return mergeConfig(defaultSiteConfig, JSON.parse(row.value) as Partial<SiteConfig>);
      }
    } catch (error) {
      console.error("Failed to read site config from database", error);
    }
  }

  try {
    const raw = await readFile(configPath, "utf8");
    return mergeConfig(defaultSiteConfig, JSON.parse(raw) as Partial<SiteConfig>);
  } catch {
    return defaultSiteConfig;
  }
}

export async function writeSiteConfig(config: SiteConfig) {
  if (canUseDatabase()) {
    return prisma.siteSetting.upsert({
      where: { key: siteConfigKey },
      update: { value: JSON.stringify(config), group: "website" },
      create: { key: siteConfigKey, value: JSON.stringify(config), group: "website" }
    }).then(() => config);
  }

  if (process.env.VERCEL) {
    throw new Error("DATABASE_URL is required to save website content on Vercel.");
  }

  await mkdir(dbDir, { recursive: true });
  await writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
  return config;
}

function mergeConfig<T>(defaults: T, saved: Partial<T>): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(saved) ? saved : defaults) as T;
  }

  if (isObject(defaults)) {
    const result: Record<string, unknown> = { ...defaults };
    for (const key of Object.keys(saved as Record<string, unknown>)) {
      const savedValue = (saved as Record<string, unknown>)[key];
      const defaultValue = (defaults as Record<string, unknown>)[key];
      result[key] = isObject(defaultValue) && isObject(savedValue)
        ? mergeConfig(defaultValue, savedValue as Partial<typeof defaultValue>)
        : savedValue ?? defaultValue;
    }
    return result as T;
  }

  return (saved ?? defaults) as T;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

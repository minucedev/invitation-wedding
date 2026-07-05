import type { Metadata } from "next";
import SiteContent from "@/components/SiteContent";
import HtmlLang from "@/components/HtmlLang";
import { getDict } from "@/lib/i18n";

const meta = getDict("en").meta;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function HomeEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <SiteContent lang="en" />
    </>
  );
}

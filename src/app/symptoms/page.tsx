import { TopicPage } from "@/components/topic-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus symptoms",
  description: "Source-linked overview of early hantavirus symptoms and urgent warning signs.",
  path: "/symptoms",
});

export default function Page() {
  return <TopicPage slug="symptoms" />;
}

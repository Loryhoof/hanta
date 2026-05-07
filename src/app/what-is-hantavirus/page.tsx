import { TopicPage } from "@/components/topic-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What is hantavirus?",
  description: "Plain-language explanation of hantavirus, source context, and why risk evidence matters.",
  path: "/what-is-hantavirus",
});

export default function Page() {
  return <TopicPage slug="what-is-hantavirus" />;
}

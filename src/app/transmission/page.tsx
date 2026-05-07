import { TopicPage } from "@/components/topic-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How hantavirus spreads",
  description: "Hantavirus transmission routes, rodent exposure risks, and person-to-person nuance.",
  path: "/transmission",
});

export default function Page() {
  return <TopicPage slug="transmission" />;
}

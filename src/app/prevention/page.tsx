import { TopicPage } from "@/components/topic-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus prevention",
  description: "Safe cleanup, rodent control, and practical prevention steps tied to official guidance.",
  path: "/prevention",
});

export default function Page() {
  return <TopicPage slug="prevention" />;
}

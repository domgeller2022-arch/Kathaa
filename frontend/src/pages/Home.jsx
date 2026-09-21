import { usePageMeta } from "@/lib/meta";
import { TAGLINE } from "@/config/site";
import { Prologue } from "@/components/home/Prologue";
import { Premise } from "@/components/home/Premise";
import { NowShowing } from "@/components/home/NowShowing";
import { Unfolds } from "@/components/home/Unfolds";
import { Standard, Chapters, Partnerships, StoryMarquee } from "@/components/home/Sections";
import { JoinList } from "@/components/JoinList";
import { Footer } from "@/components/Footer";

export default function Home() {
  usePageMeta(
    `Kathaa · ${TAGLINE}`,
    "Kathaa (कथा) means story. Live evenings built around the stories of the artists who perform them. A new initiative from Pravaha House, Sydney.",
  );
  return (
    <div data-testid="home-page">
      <Prologue />
      <Premise />
      <NowShowing />
      <Unfolds />
      <Standard />
      <StoryMarquee />
      <Chapters />
      <Partnerships />
      <JoinList />
      <Footer />
    </div>
  );
}

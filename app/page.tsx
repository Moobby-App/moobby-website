import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Stories } from "@/components/stories";
import { Scenarios } from "@/components/scenarios";
import { Team } from "@/components/team";
import { TravelDemo } from "@/components/travel-demo";
import { ScrollEffects } from "@/components/scroll-effects";
import { Overview, Timeline, Features, Commute, WordStory, Faq, FinalCta, Footer } from "@/components/sections";

export default function Home() {
  return <>
    <a className="skip" href="#kenalan">Lewati ke konten</a>
    <Navigation />
    <main>
      <Hero /><Intro /><Overview /><Timeline /><Stories /><Features />
      <Commute /><WordStory /><Scenarios /><Team /><Faq /><FinalCta />
    </main>
    <TravelDemo /><Footer /><ScrollEffects />
  </>;
}

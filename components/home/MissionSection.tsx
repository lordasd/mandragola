import type { HomeContent, Stat } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { StatsRow } from "@/components/sections/StatsRow";
import { SectionIntro } from "./SectionIntro";

/** Intro + stats: raised card, eyebrow -> h2 -> lead, then the 3 real figures. */
export function MissionSection({ mission, stats }: { mission: HomeContent["mission"]; stats: Stat[] }) {
  const id = "mission-title";
  return (
    <Section tone="raised" aria-labelledby={id}>
      <SectionIntro id={id} eyebrow={mission.eyebrow} title={mission.title} lead={mission.body} size="h3" leadClassName="lg:max-w-none lg:text-body-lg" />
      {stats.length > 0 && <StatsRow stats={stats} className="mt-stack-lg" />}
    </Section>
  );
}

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags?: string[];
};

export const blogs: BlogPost[] = [
  {
    slug: "buildathon-2025-retro-recap",
    title: "BUILDATHON 2025: When Modern Websites Went Retro",
    excerpt:
      "Our first-ever offline event brought 190 participants across 50 teams together to reimagine modern websites through a retro lens — pixelated UIs, vintage layouts, and 90s nostalgia included.",
    content: [
      "BUILDATHON 2025 was our first fully offline event, and we wanted it to feel like nothing else on campus. The brief was simple to say and hard to pull off: take a modern website and rebuild it through a retro lens.",
      "190 participants formed 50 teams and spent the day pulling apart familiar interfaces — chunky pixel buttons, dial-up loading bars, marquee text, and layouts that hadn't been seen since the early web. Underneath the nostalgia, teams still had to ship working, responsive sites.",
      "What stood out wasn't just the visual gags. Teams used the retro constraint to think differently about hierarchy and navigation, stripping away modern conveniences and rebuilding user flows from scratch.",
      "By the end of the day, the Skill Lab was lined with laptops running everything from a Windows-98-styled portfolio to a GeoCities-inspired event page. It set the tone for the kind of playful, hands-on events we wanted to keep building.",
    ],
    author: "Canara Open Source Community",
    date: "October 2025",
    readTime: "5 min read",
    image: "/blogs/buildathon.png",
    category: "Events",
    tags: ["Events", "Buildathon"],
  },
  {
    slug: "ceatherion-2025-hackathon",
    title: "CEATHERION 2025: A Launchpad for Bold Ideas",
    excerpt:
      "Over two days in November, CEC students came together to build, debug, and dream big at CEATHERION — a hackathon designed to push creativity and problem-solving beyond the usual limits.",
    content: [
      "CEATHERION 2025 ran over two days in November and was built around one question: what happens when you give students a real problem, a tight deadline, and no roadmap?",
      "Teams pitched, built, and pivoted through the night — debugging half-working demos at 2 AM, redesigning features an hour before judging, and learning that a hackathon is as much about scoping ambition as it is about writing code.",
      "Mentors from the community circulated through the room, helping teams get unstuck rather than solving problems for them. That balance is something we've tried to protect at every event since.",
      "The projects that came out of CEATHERION ranged from campus utility tools to small AI experiments, but the real output was the number of first-time hackathon participants who left wanting to build again.",
    ],
    author: "Canara Open Source Community",
    date: "November 2025",
    readTime: "6 min read",
    image: "/blogs/ceatherion.jpeg",
    category: "Hackathon",
    tags: ["Hackathon", "Events"],
  },
  {
    slug: "bug-bounty-cybersecurity-challenge",
    title: "Bug Bounty: Testing the Next Generation of Cyber Defenders",
    excerpt:
      "A two-stage cybersecurity challenge for first and second-year students, combining a fast-paced online CTF with an offline treasure hunt built around real-world clue-solving.",
    content: [
      "Bug Bounty was designed specifically for first and second-year students — a way to get newer members thinking like defenders early, without needing years of security experience first.",
      "Stage one was an online capture-the-flag: a set of timed challenges across two batches, testing everything from basic reconnaissance to reading between the lines of a poorly secured system.",
      "Stage two moved offline into the Skill Lab, trading terminals for a treasure hunt — clues that mixed cryptography, logic, and old-fashioned pattern-spotting, pushing teams to think laterally rather than just technically.",
      "The two-stage format meant the event rewarded different strengths at different points, and gave students who were newer to security a real entry point instead of a wall.",
    ],
    author: "Canara Open Source Community",
    date: "December 2025",
    readTime: "4 min read",
    image: "/blogs/bug-bounty.png",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Competition"],
  },
  {
    slug: "long-term-dsa-series",
    title: "Building Consistency: The Long Term DSA Series",
    excerpt:
      "A daily problem-solving initiative on LeetCode aimed at helping students strengthen their coding foundation one curated question at a time, proving that small, steady effort compounds into real skill.",
    content: [
      "The Long Term DSA Series started from a simple observation: most students don't struggle with data structures and algorithms because the concepts are impossible — they struggle because practice is inconsistent.",
      "Each day, a curated LeetCode problem goes out to the group, chosen to build on what came before rather than jumping around topics at random. No leaderboard pressure, no elimination — just a steady rhythm.",
      "Over weeks, the series has quietly become one of our most consistent-running initiatives, with a core group solving problems daily and sharing approaches with each other in between.",
      "It's a reminder that not every initiative needs to be a big offline event — sometimes the most durable thing a community can build is a habit.",
    ],
    author: "Canara Open Source Community",
    date: "2025",
    readTime: "3 min read",
    image: "/blogs/DSA-series.png",
    category: "Coding Practice",
    tags: ["DSA", "Coding Practice"],
  },
];
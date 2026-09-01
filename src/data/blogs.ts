export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  tags?: string[];
  /** Optional longer-form body, split into paragraphs. Falls back to `excerpt` if omitted. */
  content?: string[];
  /** Optional reading-time label shown next to the byline, e.g. "6 min read". */
  readTime?: string;
};

export const blogs: BlogPost[] = [
  {
    slug: "buildathon-2025-retro-recap",
    title: "BUILDATHON 2025: When Modern Websites Went Retro",
    excerpt:
      "Our first-ever offline event brought 190 participants across 50 teams together to reimagine modern websites through a retro lens — pixelated UIs, vintage layouts, and 90s nostalgia included.",
    author: "Canara Open Source Community",
    date: "October 2025",
    image: "/blogs/buildathon.png",
    tags: ["Events", "Buildathon"],
    readTime: "6 min read",
    content: [
      "Buildathon was our first attempt at pulling the community out from behind laptops-only Discord calls and into one room for a full day of building. 190 participants split into fifty teams, ready to compete not just on code, but on nostalgia.",
      "Instead of the usual polished modern-web brief, we handed everyone a twist: rebuild a familiar idea using a distinctly retro visual language. Pixel fonts, dial-up-era colour palettes, and chunky bevelled buttons made a comeback across the hall.",
      "Judging leaned as much on the craft of the throwback aesthetic as on the underlying code, which pushed teams to think about design constraints the way developers did twenty years ago — without today's component libraries to lean on.",
      "By evening, the room had turned into an informal museum of web history, with entries ranging from Winamp-inspired music players to GeoCities-style personal pages, all wired up with entirely modern tooling underneath.",
    ],
  },
  {
    slug: "ceatherion-2025-hackathon",
    title: "CEATHERION 2025: A Launchpad for Bold Ideas",
    excerpt:
      "Over two days in November, CEC students came together to build, debug, and dream big at CEATHERION — a hackathon designed to push creativity and problem-solving beyond the usual limits.",
    author: "Canara Open Source Community",
    date: "November 2025",
    image: "/blogs/ceatherion.jpeg",
    tags: ["Hackathon", "Events"],
    readTime: "7 min read",
    content: [
      "CEATHERION ran across two full days in November and asked CEC students to do something harder than write code: commit to an idea long enough to see it break, then fix it in front of a room full of mentors.",
      "Teams arrived with rough concepts and left with working prototypes, moving through rounds of scoping, building, and pitching that mirrored the pace of a real hackathon far more than a classroom project ever could.",
      "Mentors circulated constantly, nudging teams away from scope creep and toward the smallest version of their idea that could actually demonstrate the concept — a lesson several teams said mattered more than any single line of code they wrote.",
      "The closing showcase turned into one of the best-attended sessions of the semester, with judges from outside the college weighing in on which ideas had genuine legs beyond the two-day sprint.",
    ],
  },
  {
    slug: "bug-bounty-cybersecurity-challenge",
    title: "Bug Bounty: Testing the Next Generation of Cyber Defenders",
    excerpt:
      "A two-stage cybersecurity challenge for first and second-year students, combining a fast-paced online CTF with an offline treasure hunt built around real-world clue-solving.",
    author: "Canara Open Source Community",
    date: "December 2025",
    image: "/blogs/bug-bounty.png",
    tags: ["Cybersecurity", "Competition"],
    readTime: "5 min read",
    content: [
      "Bug Bounty was built as a two-stage test: a fast, unforgiving online capture-the-flag round to open the field, followed by an offline treasure hunt that turned the campus itself into a puzzle.",
      "The CTF stage covered the fundamentals — web exploitation, basic reverse engineering, and cryptography challenges scaled for first and second-year students who were mostly encountering these categories for the first time.",
      "Finalists then moved offline, where each solved clue physically led them to the next location on campus, folding real-world lateral thinking into what had started as a purely technical challenge.",
      "The format was designed deliberately for newer students, giving them a low-stakes way to discover whether security research was something they wanted to pursue further.",
    ],
  },
  {
    slug: "long-term-dsa-series",
    title: "Building Consistency: The Long Term DSA Series",
    excerpt:
      "A daily problem-solving initiative on LeetCode aimed at helping students strengthen their coding foundation one curated question at a time, proving that small, steady effort compounds into real skill.",
    author: "Canara Open Source Community",
    date: "2025",
    image: "/blogs/DSA-series.png",
    tags: ["DSA", "Coding Practice"],
    readTime: "4 min read",
    content: [
      "The Long Term DSA Series started from a simple observation: the students who felt most confident going into placement season weren't necessarily the ones who'd solved the hardest problems, but the ones who'd shown up daily.",
      "Each day, one curated LeetCode problem was shared with the community, chosen to build on the concepts from the day before rather than jumping between unrelated topics.",
      "There was no leaderboard and no penalty for missing a day — the goal was to lower the barrier to consistency rather than turn practice into another competition.",
      "Months in, several participants who started the series unable to explain basic recursion were walking newer members through dynamic programming problems, which is the kind of compounding the series was built to produce.",
    ],
  },
];
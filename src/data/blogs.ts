export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; 
  image: string; 
  tags?: string[];
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
  },
];
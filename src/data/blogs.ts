export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // e.g. "March 2026"
  image: string; // path under /public, e.g. "/blogs/my-post.webp"
  tags?: string[];
};

export const blogs: BlogPost[] = [
  {
    slug: "getting-started-with-open-source",
    title: "Getting Started with Open Source",
    excerpt:
      "A beginner-friendly walkthrough of how to make your first contribution to an open source project.",
    author: "Anvi Shetty",
    date: "March 2026",
    image: "/blogs/placeholder1.webp",
    tags: ["Open Source", "Beginners"],
  }
  // Add more posts here — each one just needs a unique slug, title,
  // excerpt, author, date, and image path.
];
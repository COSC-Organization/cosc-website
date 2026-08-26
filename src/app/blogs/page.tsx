import type { Metadata } from "next";
import Blogs from "@/components/Blogs";

export const metadata: Metadata = {
  title: "Blogs | Canara Open Source Community",
  description: "Read stories, insights, and updates from the Canara Open Source Community.",
};

export default function BlogsPage() {
  return <Blogs />;
}
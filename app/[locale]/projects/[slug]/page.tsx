import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

// Make this page dynamic to avoid React 19 contentlayer compatibility issues during build
export const dynamic = "force-dynamic";
export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

// Initialize Redis only if environment variables are set
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug, locale);

  if (!project || !project.published) {
    notFound();
  }

  // Get views from Redis if available, otherwise default to 0
  let views = 0;
  if (redis) {
    try {
      views =
        (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ??
        0;
    } catch (error) {
      console.warn("Failed to fetch views from Redis:", error);
    }
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx source={project.content} />
      </article>
    </div>
  );
}

import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { PerspectiveProvider } from "@/app/components/perspective-context";
import { PerspectiveToggle } from "@/app/components/perspective-toggle";
import { PerspectiveTutorial } from "@/app/components/perspective-tutorial";
import { PerspectiveContent } from "@/app/components/perspective-content";

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

  // Pre-render both content variations on server side
  const businessContent = project.contentBusiness ? (
    <Mdx source={project.contentBusiness} />
  ) : (
    <Mdx source={project.content} />
  );

  const developerContent = project.contentDeveloper ? (
    <Mdx source={project.contentDeveloper} />
  ) : (
    <Mdx source={project.content} />
  );

  return (
    <PerspectiveProvider>
      <div className="bg-zinc-50 min-h-screen">
        <Header project={project} views={views} />
        <ReportView slug={project.slug} />

        {/* Perspective Toggle - Self-positioned at right-center */}
        <PerspectiveToggle />

        {/* Tutorial for first-time visitors */}
        <PerspectiveTutorial />

        <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
          <PerspectiveContent
            businessContent={businessContent}
            developerContent={developerContent}
          />
        </article>
      </div>
    </PerspectiveProvider>
  );
}

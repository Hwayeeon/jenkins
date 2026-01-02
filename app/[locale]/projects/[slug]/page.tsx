import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/mdx";
import { Header } from "./header";
import { ReportView } from "./view";
import { Mdx } from "@/app/components/mdx";
import { PerspectiveProvider } from "@/app/components/perspective-context";
import { PerspectiveToggle } from "@/app/components/perspective-toggle";
import { PerspectiveContent } from "@/app/components/perspective-content";
import "./mdx.css";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  const hasPerspectiveContent = project.contentBusiness && project.contentDeveloper;

  return (
    <PerspectiveProvider>
      <div className="bg-zinc-50 min-h-screen">
        <Header project={project} views={0} />
        <ReportView slug={project.slug} />

        {hasPerspectiveContent ? (
          <>
            <PerspectiveToggle />
            <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
              <PerspectiveContent
                businessContent={<Mdx source={project.contentBusiness!} />}
                developerContent={<Mdx source={project.contentDeveloper!} />}
              />
            </article>
          </>
        ) : (
          <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
            <Mdx source={project.content} />
          </article>
        )}
      </div>
    </PerspectiveProvider>
  );
}

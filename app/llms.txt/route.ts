import { getAllProjects } from "@/lib/mdx";

const SITE_URL = "https://davidhwang.dev";

export async function GET() {
  const projects = getAllProjects("en");
  const publishedProjects = projects.filter((p) => p.published);

  // Build llms.txt content
  const lines: string[] = [
    "# David Hwayeon - Portfolio",
    "",
    "> Software developer specializing in web development, building modern applications with Next.js, React, and TypeScript.",
    "",
    "## About",
    "",
    "This is the personal portfolio of David Hwayeon, showcasing projects and technical work.",
    "",
    "## Projects",
    "",
  ];

  // Add each project
  for (const project of publishedProjects) {
    lines.push(`### ${project.title}`);
    lines.push("");
    lines.push(`- **URL**: ${SITE_URL}/projects/${project.slug}`);
    lines.push(`- **Description**: ${project.description}`);
    if (project.date) {
      lines.push(`- **Date**: ${project.date}`);
    }
    if (project.url) {
      lines.push(`- **Live**: ${project.url}`);
    }
    if (project.repository) {
      lines.push(`- **Repository**: ${project.repository}`);
    }
    lines.push("");
  }

  // Add useful links
  lines.push("## Links");
  lines.push("");
  lines.push(`- [Home](${SITE_URL})`);
  lines.push(`- [Projects](${SITE_URL}/projects)`);
  lines.push(`- [Contact](${SITE_URL}/contact)`);
  lines.push(`- [About](${SITE_URL}/about)`);
  lines.push(`- [RSS Feed](${SITE_URL}/rss)`);
  lines.push("");
  lines.push("## Contact");
  lines.push("");
  lines.push("For inquiries, please visit the contact page or reach out via the links provided on the website.");

  const content = lines.join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

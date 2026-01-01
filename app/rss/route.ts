import { getAllProjects } from "@/lib/mdx";

const SITE_URL = "https://davidsonrafael.online";

export async function GET() {
  const projects = getAllProjects("en");
  const publishedProjects = projects.filter((p) => p.published);

  const rssItems = publishedProjects
    .map((project) => {
      const pubDate = project.date
        ? new Date(project.date).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${project.title}]]></title>
      <link>${SITE_URL}/projects/${project.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/projects/${project.slug}</guid>
      <description><![CDATA[${project.description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>David Hwayeon - Portfolio</title>
    <link>${SITE_URL}</link>
    <description>Projects and work by David Hwayeon, a software developer specializing in web development.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

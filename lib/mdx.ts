import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Helper to visit nodes (replaces unist-util-visit)
function visit(node: any, test: any, visitor: any) {
  if (test(node)) {
    visitor(node);
  }
  if (node.children) {
    node.children.forEach((child: any) => visit(child, test, visitor));
  }
}

export function remarkCodeHike() {
  return (tree: any) => {
    visit(tree, (node: any) => node.type === "code", (node: any) => {
      if (!node.lang) return;
      
      const langMatch = node.lang.match(/^\{(.*)\}$/);
      if (langMatch) {
        const meta = langMatch[1]; // "index.ts" or "ts"
        
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        
        if (meta.includes(".")) {
           node.data.hProperties.filename = meta;
           const ext = meta.split(".").pop();
           node.lang = ext;
        } else {
           node.lang = meta;
        }
      } 
    });
  };
}

/**
 * Extract business and developer perspective content from MDX
 * Looks for ## Business View and ## Developer View (or localized versions)
 */
function extractPerspectiveContent(content: string): {
  contentBusiness?: string;
  contentDeveloper?: string;
} {
  // Pattern to match both English and Indonesian section headers
  const businessPattern = /##\s+(Business View|Tampilan Bisnis)\s*\n([\s\S]*?)(?=##\s+(Developer View|Tampilan Developer)|$)/i;
  const developerPattern = /##\s+(Developer View|Tampilan Developer)\s*\n([\s\S]*?)$/i;
  
  const businessMatch = content.match(businessPattern);
  const developerMatch = content.match(developerPattern);
  
  return {
    contentBusiness: businessMatch ? businessMatch[2].trim() : undefined,
    contentDeveloper: developerMatch ? developerMatch[2].trim() : undefined,
  };
}

const contentDirectory = path.join(process.cwd(), "content");

const defaultLocale = "en";

function getProjectsDirectory(locale: string): string {
  return path.join(contentDirectory, locale, "projects");
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  descriptionDev?: string;
  date?: string;
  url?: string;
  repository?: string;
  published: boolean;
  content: string;
  contentBusiness?: string;
  contentDeveloper?: string;
}

export function getAllProjects(locale: string = defaultLocale): Project[] {
  const projectsDirectory = getProjectsDirectory(locale);
  const fallbackDirectory = getProjectsDirectory(defaultLocale);
  
  // Get all available slugs from default locale
  const defaultFileNames = fs.readdirSync(fallbackDirectory);
  
  const projects = defaultFileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      
      // Try locale-specific path first, fallback to default
      let fullPath = path.join(projectsDirectory, fileName);
      if (!fs.existsSync(fullPath)) {
        fullPath = path.join(fallbackDirectory, fileName);
      }
      
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Extract dual-perspective content if available
      const { contentBusiness, contentDeveloper } = extractPerspectiveContent(content);
      
      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        descriptionDev: data.descriptionDev,
        date: data.date?.toString(),
        url: data.url,
        repository: data.repository,
        published: data.published !== false,
        content,
        contentBusiness,
        contentDeveloper,
      };
    });

  return projects.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getProjectBySlug(slug: string, locale: string = defaultLocale): Project | undefined {
  const projectsDirectory = getProjectsDirectory(locale);
  const fallbackDirectory = getProjectsDirectory(defaultLocale);
  
  // Try locale-specific path first, fallback to default
  let fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(fallbackDirectory, `${slug}.mdx`);
  }

  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Extract dual-perspective content if available
  const { contentBusiness, contentDeveloper } = extractPerspectiveContent(content);
  
  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    descriptionDev: data.descriptionDev,
    date: data.date?.toString(),
    url: data.url,
    repository: data.repository,
    published: data.published !== false,
    content,
    contentBusiness,
    contentDeveloper,
  };
}


import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { remarkCodeHike } from "../../lib/mdx";
import rehypePrettyCode from "rehype-pretty-code";

function clsx(...args: any[]) {
  return args.filter(Boolean).join(" ");
}

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={clsx(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={clsx(
        "mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={clsx(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={clsx(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={clsx(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={clsx(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) {
      return (
        <a
          className={clsx(
            "font-medium text-zinc-900 underline underline-offset-4",
            className
          )}
          {...props}
        />
      );
    }

    if (href.startsWith("http") || href.startsWith("//")) {
      return (
        <a
          href={href}
          className={clsx(
            "font-medium text-zinc-900 underline underline-offset-4",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <Link
        href={href}
        className={clsx(
          "font-medium text-zinc-900 underline underline-offset-4",
          className
        )}
        {...props}
      />
    );
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={clsx("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={clsx(
        "mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={clsx("rounded-md border border-zinc-200", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 border-zinc-200 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="w-full my-6 overflow-y-auto">
      <table className={clsx("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={clsx(
        "m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
        className
      )}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={clsx(
        "border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={clsx(
        "border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={clsx(
        "mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement> & { filename?: string }) => {
    const { filename } = props;
    const isBlock = filename || (className && className.includes("language-"));

    if (isBlock) {
      return (
         <code
          className={clsx(
            "block min-w-full", // clean reset
            className
          )}
          {...props}
        >
          {filename ? (
            <div className="w-full bg-zinc-800/50 border-b border-zinc-800 -mx-4 -mt-4 mb-4 px-4 py-2 flex items-center justify-between text-xs text-zinc-400 font-sans rounded-t-lg">
              <span>{filename}</span>
            </div>
          ) : null}
          {props.children}
        </code>
      );
    }
    
    // Inline code styling
    return (
      <code
        className={clsx(
          // Styles are now handled in global.css to avoid conflicts with block code
          className
        )}
        {...props}
      />
    );
  },
  Image,
};

interface MdxProps {
  source: string;
}

export function Mdx({ source }: MdxProps) {
  return (
    <div className="mdx">
      <MDXRemote 
        source={source} 
        components={components} 
        options={{
          mdxOptions: {
            remarkPlugins: [remarkCodeHike],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  onVisitLine(node: any) {
                    // Prevent lines from collapsing in `display: grid` mode, and allow empty
                    // lines to be copy/pasted
                    if (node.children.length === 0) {
                      node.children = [{ type: "text", value: " " }];
                    }
                  },
                  onVisitHighlightedLine(node: any) {
                    node.properties.className.push("line--highlighted");
                  },
                  onVisitHighlightedWord(node: any) {
                    node.properties.className = ["word--highlighted"];
                  },
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}

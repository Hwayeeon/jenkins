<div align="center">
    <h1 align="center">Personal Portfolio</h1>

A personal portfolio website built with [Next.js 16](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Upstash](https://upstash.com), and deployed to [Vercel](https://vercel.com/).

</div>

<br/>

## Features

- ⚡ **Next.js 16** with App Router and React 19
- 🌐 **Internationalization (i18n)** using [next-intl](https://next-intl-docs.vercel.app/) with English and Indonesian locales
- 📝 **MDX Support** via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for blog and project content
- 🎨 **Syntax Highlighting** with [Shiki](https://shiki.matsu.io/) and [rehype-pretty-code](https://rehype-pretty-code.netlify.app/)
- 📊 **Page View Counter** powered by [Upstash Redis](https://upstash.com)
- 🎭 **Animations** using [Framer Motion](https://www.framer.com/motion/)
- 💅 **Styling** with [Tailwind CSS](https://tailwindcss.com/)

## Running Locally

Clone the repository:

```sh-session
git clone <your-repo-url>
cd chronark.com
```

Create a `.env.local` file with the following environment variables:

```env
# Get your free Redis database from https://console.upstash.com/
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_here
```

Then install dependencies and run the development server:

```sh-session
pnpm install
pnpm dev
```

## Project Structure

```
├── app/
│   └── [locale]/          # Internationalized routes
├── content/
│   ├── en/                # English MDX content (blog posts, projects)
│   └── id/                # Indonesian MDX content
├── i18n/                  # i18n configuration
├── messages/
│   ├── en.json            # English translations
│   └── id.json            # Indonesian translations
├── lib/                   # Utility functions
└── public/                # Static assets
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Styling | Tailwind CSS |
| i18n | next-intl |
| MDX | next-mdx-remote |
| Syntax Highlighting | Shiki + rehype-pretty-code |
| Database | Upstash Redis |
| Animations | Framer Motion |
| Deployment | Vercel |

## Credits

Originally forked from [chronark/chronark.com](https://github.com/chronark/chronark.com).

## License

MIT License - See [LICENSE](./LICENSE) for details.

# Personal Portfolio

A modern, high-performance personal portfolio and blog built with Next.js 16, React 19, and Tailwind CSS. This project focuses on developer experience, internationalization, and privacy-focused analytics.

## Key Features

- **Next.js 16 & React 19**: Leveraging the latest App Router foundation and React Server Components for optimal performance.
- **Internationalization (i18n)**: Native support for English (`en`) and Indonesian (`id`) locales using `next-intl`, featuring automatic locale detection and organized message dictionaries.
- **Dual-Perspective MDX**: Custom MDX processing engine that supports unique "Business" and "Developer" content toggles within a single article, allowing for tailored reading experiences.
- **Advanced MDX**: Remote MDX rendering powered by `next-mdx-remote`, enabling dynamic content loading with server-side syntax highlighting via `shiki` and `rehype-pretty-code`.
- **Privacy-First Analytics**: Integrated Beam Analytics for tracking page views and visitor metrics without compromising user privacy.
- **Page View Counters**: Real-time page view tracking using Upstash Redis.
- **Dynamic Animations**: Smooth, polished interactions and page transitions powered by Framer Motion.

## Tech Stack

| Category | Technology | Description |
|----------|------------|-------------|
| **Core** | Next.js 16 | App Router, Server Components |
| **Language** | TypeScript | Static typing and type safety |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Animations** | Framer Motion | Production-ready animation library |
| **Data** | Upstash Redis | Serverless Redis for real-time data |
| **Content** | MDX | Markdown with strict Frontmatter validation |
| **i18n** | next-intl | Internationalization framework |
| **Highlighting** | Shiki | High-fidelity syntax highlighting |

## Project Structure

```
├── app/
│   └── [locale]/          # Internationalized routes and pages
├── content/
│   ├── en/                # English content (projects/posts)
│   └── id/                # Indonesian content (projects/posts)
├── i18n/                  # Localization configuration
├── lib/                   # Core utilities (MDX engine, Redis client)
├── messages/
│   ├── en.json            # English translation keys
│   └── id.json            # Indonesian translation keys
├── public/                # Static assets (fonts, images)
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm (Package manager)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Redis Database (Upstash)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Analytics (Beam)
NEXT_PUBLIC_BEAM_TOKEN=your_beam_token
```

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Deployment

### Build and Run with Docker Compose

```bash
docker compose up --build
```

### Build Standalone Image

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.local portfolio
```

> **Note**: Ensure your `.env.local` file contains `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for Redis functionality.

## License

MIT License - See [LICENSE](./LICENSE) for details.

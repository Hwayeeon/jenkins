import { Navigation } from "../../components/nav";
import { getTranslations } from 'next-intl/server';

const techStack = [
  { name: "Next.js", icon: "ci ci-nextjs-light" },
  { name: "React", icon: "ci ci-react" },
  { name: "NestJS", icon: "ci ci-nestjs" },
  { name: "TypeScript", icon: "ci ci-typescript" },
  { name: "Python", icon: "ci ci-python" },
  { name: "Java", icon: "ci ci-java" },
  { name: "Rust", icon: "ci ci-rust-light" },
  { name: "C", icon: "ci ci-c" },
  { name: "C++", icon: "ci ci-cpp" },
  { name: "C#", icon: "ci ci-csharp" },
];

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <Navigation />
      <div className="container px-4 mx-auto pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="space-y-4 mb-12">
            <p className="text-zinc-500 text-sm tracking-widest uppercase animate-fade-in">
              {t('intro')}
            </p>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 font-display sm:text-5xl md:text-6xl animate-fade-in">
              {t('name')}
            </h1>
            <div className="flex flex-wrap gap-2 text-zinc-400 animate-fade-in">
              <span className="px-3 py-1 text-sm border border-zinc-700 rounded-full">
                {t('role')}
              </span>
              <span className="px-3 py-1 text-sm border border-zinc-700 rounded-full">
                {t('university')}
              </span>
              <span className="px-3 py-1 text-sm border border-zinc-700 rounded-full">
                {t('semester')}
              </span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-12 animate-fade-in">
            <p className="text-zinc-400 leading-relaxed text-lg">
              {t('bio')}
            </p>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-xl font-semibold text-zinc-200 mb-6 font-display">
              {t('techStackTitle')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300 group"
                >
                  <i className={`${tech.icon} ci-3x group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-zinc-200 mb-4 font-display">
              {t('philosophyTitle')}
            </h2>
            <blockquote className="border-l-2 border-zinc-600 pl-6 italic text-zinc-400 text-lg">
              "{t('philosophy')}"
            </blockquote>
          </div>

          {/* Profile Image Placeholder */}
          {/* Uncomment and update path when image is added to public folder
          <div className="mt-12 flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-zinc-700">
              <Image
                src="/picture.jpg"
                alt="Davidson Rafael"
                fill
                className="object-cover"
              />
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}

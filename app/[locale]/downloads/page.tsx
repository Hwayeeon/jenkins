"use client";

import { useTranslations } from "next-intl";
import { Navigation } from "../../components/nav";

export default function DownloadPage() {
    const t = useTranslations("Downloads");

    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen flex flex-col items-center justify-center">
            <Navigation />
            <main className="container px-4 pt-24 pb-16 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 font-display sm:text-5xl md:text-6xl animate-fade-in text-center">
                    {t('title')}
                </h1>

                <div className="flex gap-4 mt-6">
                    <a
                        href="/data.bin"
                        download
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
                    >
                        {t('button1')}
                    </a>

                    <a
                        href="/setup.exe"
                        download
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
                    >
                        {t('button2')}
                    </a>
                    <a
                        href="/data-rus.bin"
                        download
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
                    >
                        {t('button3')}
                    </a>
                </div>
            </main>
        </div>
    );
}

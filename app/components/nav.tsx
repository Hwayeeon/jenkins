"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from 'next-intl';

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const t = useTranslations('Navigation');
	const locale = useLocale();

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const otherLocale = locale === 'en' ? 'id' : 'en';

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/about"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							{t('about')}
						</Link>
						<Link
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							{t('projects')}
						</Link>
						<Link
							href="/services"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							{t('services')}
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							{t('contact')}
						</Link>
						{/* Language Switcher */}
						<Link
							href={`/${otherLocale}`}
							className="duration-200 text-zinc-500 hover:text-zinc-100 uppercase text-sm font-medium border border-zinc-700 px-2 py-0.5 rounded"
						>
							{otherLocale.toUpperCase()}
						</Link>
					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};

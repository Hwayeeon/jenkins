"use client";
import { Navigation } from "../../components/nav";
import { useTranslations, useLocale } from 'next-intl';
import { Layout, Server, Terminal } from 'lucide-react';
import Particles from "../../components/particles";
import { motion } from "framer-motion";

interface PricingCardProps {
  title: string;
  subtitle: string;
  badge?: string;
  isFeatured?: boolean;
  price: string;
  priceSuffix?: string;
  features: string[];
  contactSubject: string;
  contactBtn: string;
  index: number;
}

function PricingCard({
  title,
  subtitle,
  badge,
  isFeatured = false,
  price,
  priceSuffix,
  features,
  contactSubject,
  contactBtn,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Featured Badge - Above card */}
      {isFeatured && badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-purple-600 text-white rounded-full shadow-lg shadow-purple-500/30">
            {badge}
          </span>
        </div>
      )}

      {/* Card */}
      <div 
        className={`relative h-full rounded-2xl border transition-all duration-300 ${
          isFeatured 
            ? 'bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 border-purple-500/30 shadow-xl shadow-purple-500/10' 
            : 'bg-gradient-to-b from-zinc-800/50 to-zinc-900/80 border-zinc-700/50 hover:border-zinc-600/50'
        }`}
      >
        {/* Non-featured badge */}
        {!isFeatured && badge && (
          <div className="absolute -top-3 right-4">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black rounded-full">
              {badge}
            </span>
          </div>
        )}

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-3">
              {title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight whitespace-nowrap">
                {price}
              </span>
              {priceSuffix && (
                <span className="text-zinc-400 text-lg">{priceSuffix}</span>
              )}
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-sm text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={`mailto:contact@davidsonrafael.online?subject=${encodeURIComponent(contactSubject)}`}
            className={`block w-full py-3.5 text-center text-sm font-semibold rounded-lg border transition-all duration-300 ${
              isFeatured
                ? 'bg-purple-600 text-white border-purple-500 hover:bg-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-transparent text-white border-zinc-600 hover:bg-zinc-800 hover:border-zinc-500'
            }`}
          >
            {contactBtn}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const t = useTranslations('ServicesPage');
  const locale = useLocale();
  
  const isIDR = locale === 'id';

  const services = [
    {
      icon: <Layout className="w-7 h-7 text-zinc-300" />,
      title: t('webApps.title'),
      subtitle: t('webApps.subtitle'),
      badge: t('webApps.badge'),
      isFeatured: true,
      price: isIDR ? t('webApps.priceIDR') : t('webApps.priceUSD'),
      features: t.raw('webApps.features') as string[],
      contactSubject: 'Web App Development Inquiry',
    },
    {
      icon: <Server className="w-7 h-7 text-zinc-300" />,
      title: t('hosting.title'),
      subtitle: t('hosting.subtitle'),
      badge: t('hosting.badge'),
      isFeatured: false,
      price: isIDR ? t('hosting.priceIDR') : t('hosting.priceUSD'),
      priceSuffix: isIDR ? '/bln' : '/mo',
      features: t.raw('hosting.features') as string[],
      contactSubject: 'Managed Hosting Inquiry',
    },
    {
      icon: <Terminal className="w-7 h-7 text-zinc-300" />,
      title: t('automation.title'),
      subtitle: t('automation.subtitle'),
      badge: t('automation.badge'),
      isFeatured: false,
      price: isIDR ? t('automation.priceIDR') : t('automation.priceUSD'),
      features: t.raw('automation.features') as string[],
      contactSubject: 'Automation Script Inquiry',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={60}
      />
      <Navigation />
      
      <div className="container px-4 mx-auto pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {t('title')}
            </h1>
            <p className="text-zinc-400 text-lg mt-6 max-w-xl mx-auto">
              {t('intro')}
            </p>
          </motion.div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
            {services.map((service, index) => (
              <PricingCard
                key={service.title}
                {...service}
                contactBtn={t('contactBtn')}
                index={index}
              />
            ))}
          </div>

          {/* Footer Note */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-zinc-500 text-sm">
              {t('footerNote')}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

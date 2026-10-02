import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const steps = [
  { num: '01', icon: 'ri-calendar-check-line', titleKey: 'how_chapter1_title', descKey: 'how_chapter1_desc' },
  { num: '02', icon: 'ri-map-pin-2-line', titleKey: 'how_chapter2_title', descKey: 'how_chapter2_desc' },
  { num: '03', icon: 'ri-music-2-line', titleKey: 'how_chapter3_title', descKey: 'how_chapter3_desc' },
  { num: '04', icon: 'ri-moon-clear-line', titleKey: 'how_chapter4_title', descKey: 'how_chapter4_desc' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function ComoFunciona() {
  const { t } = useTranslation();
  const header = useInView(0.1);

  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-36"
    >
      <div className="relative z-10 section-padding">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center max-w-3xl mx-auto mb-14 md:mb-20 transition-all duration-1000 ${
            header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('nav_como_funciona')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-5 leading-tight">
            {t('how_title')}
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t('how_subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {steps.map((step, index) => (
            <StepCard key={step.num} step={step} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index, t }: { step: typeof steps[0]; index: number; t: (key: string) => string }) {
  const { ref, visible } = useInView(0.12);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Connector line - hidden on last item and mobile */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/20 to-transparent" />
      )}

      <div className="h-full bg-surface border border-gray-100 rounded-xl p-6 md:p-7 relative overflow-hidden">
        {/* Step number */}
        <span className="absolute top-2 right-3 font-display text-4xl font-bold text-accent/5 leading-none select-none" aria-hidden="true">
          {step.num}
        </span>

        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent mb-5">
          <i className={`${step.icon} text-xl text-white`} />
        </div>

        <h3 className="font-display text-lg md:text-xl text-primary font-bold mb-3 leading-tight">
          {t(step.titleKey)}
        </h3>

        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          {t(step.descKey)}
        </p>
      </div>
    </div>
  );
}
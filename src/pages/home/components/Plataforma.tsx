import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Plataforma() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="plataforma" ref={sectionRef} className="bg-white py-20 md:py-28 lg:py-36">
      <div className="section-padding">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('platform_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6 md:mb-8 leading-tight">
            {t('platform_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
            {t('platform_text')}
          </p>
        </div>

        <div className={`mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 md:gap-4 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: 'ri-global-line', labelKey: 'platform_badge_bilingual' },
            { icon: 'ri-shield-check-line', labelKey: 'platform_badge_safe' },
            { icon: 'ri-smartphone-line', labelKey: 'platform_badge_digital' },
            { icon: 'ri-team-line', labelKey: 'platform_badge_groups' },
          ].map((badge) => (
            <div key={badge.labelKey} className="flex items-center gap-2 px-4 py-2.5 bg-surface rounded-full">
              <i className={`${badge.icon} text-accent text-sm`} />
              <span className="text-primary text-sm font-medium whitespace-nowrap">{t(badge.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
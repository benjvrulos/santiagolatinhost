import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const pillars = [
  { icon: 'ri-team-line', titleKey: 'safety_pillar1_title', descKey: 'safety_pillar1_desc' },
  { icon: 'ri-map-pin-2-line', titleKey: 'safety_pillar2_title', descKey: 'safety_pillar2_desc' },
  { icon: 'ri-message-3-line', titleKey: 'safety_pillar3_title', descKey: 'safety_pillar3_desc' },
  { icon: 'ri-translate-2', titleKey: 'safety_pillar4_title', descKey: 'safety_pillar4_desc' },
];

export default function Seguridad() {
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

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="seguridad" ref={sectionRef} className="bg-primary py-20 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-warm/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/50 text-sm font-medium tracking-[0.15em] uppercase mb-4">
            {t('safety_title')}
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight mb-8 md:mb-10">
            {t('safety_quote')}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#reserva"
              onClick={(e) => { e.preventDefault(); scrollTo('#reserva'); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-semibold rounded-full hover:bg-surface transition-colors whitespace-nowrap"
            >
              {t('safety_cta_primary')}
            </a>
            <a
              href="#como-funciona"
              onClick={(e) => { e.preventDefault(); scrollTo('#como-funciona'); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {t('safety_cta_secondary')}
            </a>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.titleKey}
              className={`bg-primary-light/50 rounded-xl p-5 md:p-6 border border-white/5 hover:border-accent/20 transition-all duration-500 hover:bg-primary-light/70 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <i className={`${pillar.icon} text-2xl text-warm`} />
              </div>
              <h4 className="text-white font-semibold text-base mb-2">
                {t(pillar.titleKey)}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {t(pillar.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
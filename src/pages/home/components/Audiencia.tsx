import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const segments = [
  { icon: 'ri-plane-line', titleKey: 'audience1_title', descKey: 'audience1_desc' },
  { icon: 'ri-graduation-cap-line', titleKey: 'audience2_title', descKey: 'audience2_desc' },
  { icon: 'ri-camera-lens-line', titleKey: 'audience3_title', descKey: 'audience3_desc' },
  { icon: 'ri-briefcase-4-line', titleKey: 'audience4_title', descKey: 'audience4_desc' },
  { icon: 'ri-hotel-bed-line', titleKey: 'audience5_title', descKey: 'audience5_desc' },
];

export default function Audiencia() {
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
    <section id="audiencia" ref={sectionRef} className="bg-white py-20 md:py-28 lg:py-36">
      <div className="section-padding">
        <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('audience_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-5 leading-tight">
            {t('audience_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t('audience_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6 max-w-6xl mx-auto">
          {segments.map((segment, index) => (
            <div
              key={segment.titleKey}
              className={`bg-surface rounded-xl p-6 text-center hover:bg-surface-dark transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-white">
                <i className={`${segment.icon} text-2xl text-accent`} />
              </div>
              <h4 className="text-primary font-semibold text-base mb-2">
                {t(segment.titleKey)}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(segment.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
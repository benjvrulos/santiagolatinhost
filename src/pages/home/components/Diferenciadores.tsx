import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const diffs = [
  { icon: 'ri-music-2-line', titleKey: 'diff1_title', descKey: 'diff1_desc' },
  { icon: 'ri-sun-foggy-line', titleKey: 'diff2_title', descKey: 'diff2_desc' },
  { icon: 'ri-translate-2', titleKey: 'diff3_title', descKey: 'diff3_desc' },
  { icon: 'ri-smartphone-line', titleKey: 'diff4_title', descKey: 'diff4_desc' },
  { icon: 'ri-shield-check-line', titleKey: 'diff5_title', descKey: 'diff5_desc' },
  { icon: 'ri-group-2-line', titleKey: 'diff6_title', descKey: 'diff6_desc' },
];

export default function Diferenciadores() {
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
    <section id="diferenciadores" ref={sectionRef} className="bg-surface py-20 md:py-28 lg:py-36">
      <div className="section-padding">
        <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('diff_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-5 leading-tight">
            {t('diff_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t('diff_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {diffs.map((diff, index) => (
            <div
              key={diff.titleKey}
              className={`bg-white rounded-xl p-6 md:p-7 hover:shadow-lg transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/10 mb-4">
                <i className={`${diff.icon} text-xl text-accent`} />
              </div>
              <h4 className="text-primary font-semibold text-base mb-2">
                {t(diff.titleKey)}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(diff.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
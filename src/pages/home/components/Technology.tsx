import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

const capabilities = [
  { icon: 'ri-sparkling-2-line', titleKey: 'tech1_title', descKey: 'tech1_desc', highlight: true },
  { icon: 'ri-store-3-line', titleKey: 'tech2_title', descKey: 'tech2_desc', highlight: false },
  { icon: 'ri-translate-2', titleKey: 'tech3_title', descKey: 'tech3_desc', highlight: false },
  { icon: 'ri-stack-line', titleKey: 'tech4_title', descKey: 'tech4_desc', highlight: false },
];

export default function Technology() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.08);

  return (
    <section id="technology" ref={ref} className="bg-surface py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('tech_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4 leading-tight">
            {t('tech_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t('tech_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap, index) => (
            <div
              key={cap.titleKey}
              className={`rounded-2xl p-6 md:p-8 transition-all duration-700 ${
                cap.highlight
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-100'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full mb-5 ${
                  cap.highlight ? 'bg-accent' : 'bg-accent/10'
                }`}
              >
                <i className={`${cap.icon} text-xl ${cap.highlight ? 'text-white' : 'text-accent'}`} />
              </div>
              <h3 className={`font-display text-lg md:text-xl font-bold mb-2.5 ${cap.highlight ? 'text-white' : 'text-primary'}`}>
                {t(cap.titleKey)}
              </h3>
              <p className={`text-sm md:text-base leading-relaxed ${cap.highlight ? 'text-white/60' : 'text-gray-500'}`}>
                {t(cap.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
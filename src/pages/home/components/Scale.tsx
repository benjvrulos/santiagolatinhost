import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

const tiers = [
  { icon: 'ri-music-2-line', key: 'tier1' },
  { icon: 'ri-building-2-line', key: 'tier2' },
  { icon: 'ri-map-2-line', key: 'tier3' },
];

export default function Scale() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.12);

  return (
    <section id="scale" ref={ref} className="bg-surface py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              {t('scale_label')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6 leading-tight">
              {t('scale_title')}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
              {t('scale_text1')}
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              {t('scale_text2')}
            </p>
          </div>

          <div className={`space-y-4 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {tiers.map((tier, index) => (
              <div key={tier.key} className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                  <i className={`${tier.icon} text-xl text-accent`} />
                </div>
                <div className="flex-1">
                  <p className="text-primary text-sm md:text-base font-medium leading-relaxed">
                    {t(`scale_${tier.key}`)}
                  </p>
                </div>
                <span className="font-display text-2xl font-bold text-accent/20">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
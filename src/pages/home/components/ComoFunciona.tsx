import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

const steps = [
  { num: '01', icon: 'ri-compass-3-line', titleKey: 'how_step1_title', descKey: 'how_step1_desc' },
  { num: '02', icon: 'ri-calendar-check-line', titleKey: 'how_step2_title', descKey: 'how_step2_desc' },
  { num: '03', icon: 'ri-secure-payment-line', titleKey: 'how_step3_title', descKey: 'how_step3_desc' },
  { num: '04', icon: 'ri-moon-clear-line', titleKey: 'how_step4_title', descKey: 'how_step4_desc' },
];

export default function ComoFunciona() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.1);

  return (
    <section id="como-funciona" ref={ref} className="bg-white py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className={`text-center max-w-2xl mx-auto mb-14 md:mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('nav_how')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-5 leading-tight">
            {t('how_title')}
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t('how_subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/20 to-transparent" />
              )}
              <div className="h-full bg-surface border border-gray-100 rounded-xl p-6 md:p-7 relative overflow-hidden">
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
          ))}
        </div>
      </div>
    </section>
  );
}
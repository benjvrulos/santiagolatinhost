import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

const points = ['whynow_p1', 'whynow_p2', 'whynow_p3', 'whynow_p4'];

export default function WhyNow() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.1);

  return (
    <section id="why-now" ref={ref} className="bg-surface py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 md:mb-14 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              {t('whynow_label')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold leading-tight">
              {t('whynow_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-12">
            {points.map((point, index) => (
              <div
                key={point}
                className={`flex items-start gap-4 bg-white rounded-xl p-5 md:p-6 border border-gray-100 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                  <i className="ri-close-line text-lg text-accent" />
                </div>
                <p className="text-primary text-sm md:text-base font-medium leading-relaxed">
                  {t(point)}
                </p>
              </div>
            ))}
          </div>

          <div className={`text-center transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-primary rounded-2xl px-8 py-7 md:px-12 md:py-9">
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-white font-bold leading-snug">
                {t('whynow_conclusion')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
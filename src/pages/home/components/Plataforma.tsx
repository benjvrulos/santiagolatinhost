import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

export default function Plataforma() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.1);

  return (
    <section id="plataforma" ref={ref} className="bg-primary py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="section-padding">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-warm-light font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('platform_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 leading-tight">
            {t('platform_title')}
          </h2>
          <p className="text-white/65 text-base md:text-lg lg:text-xl leading-relaxed">
            {t('platform_text')}
          </p>
        </div>

        {/* Flow diagram */}
        <div className={`mt-14 md:mt-20 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Local SMEs */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 md:py-7 text-center">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-white/5">
              <i className="ri-store-2-line text-xl text-warm-light" />
            </div>
            <h3 className="font-display text-lg md:text-xl text-white font-bold mb-1.5">
              {t('platform_local_title')}
            </h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-lg mx-auto">
              {t('platform_local_desc')}
            </p>
          </div>

          <div className="flex justify-center py-3 md:py-4">
            <i className="ri-arrow-down-line text-2xl text-accent" />
          </div>

          {/* Santiago Latin Host */}
          <div className="rounded-2xl border-2 border-accent bg-accent/[0.08] px-6 py-6 md:py-7 text-center">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-accent">
              <i className="ri-links-line text-xl text-white" />
            </div>
            <h3 className="font-display text-lg md:text-xl text-white font-bold mb-1.5">
              {t('platform_center_title')}
            </h3>
            <p className="text-white/65 text-sm leading-relaxed max-w-lg mx-auto">
              {t('platform_center_desc')}
            </p>
          </div>

          <div className="flex justify-center py-3 md:py-4">
            <i className="ri-arrow-down-line text-2xl text-accent" />
          </div>

          {/* Travelers */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 md:py-7 text-center">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-white/5">
              <i className="ri-earth-line text-xl text-warm-light" />
            </div>
            <h3 className="font-display text-lg md:text-xl text-white font-bold mb-1.5">
              {t('platform_traveler_title')}
            </h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-lg mx-auto">
              {t('platform_traveler_desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
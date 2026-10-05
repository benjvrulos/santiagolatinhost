import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

export default function Execution() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.15);

  return (
    <section id="proof" ref={ref} className="bg-white py-16 md:py-20">
      <div className="section-padding">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="rounded-2xl border border-gray-100 bg-surface px-6 py-10 md:px-12 md:py-12 text-center">
            <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-5">
              {t('exec_label')}
            </span>
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">
              {t('exec_support')}
            </p>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/10">
                <i className="ri-award-line text-2xl text-accent" />
              </span>
              <span className="font-display text-xl md:text-2xl lg:text-3xl text-primary font-bold">
                {t('exec_program')}
              </span>
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              {t('exec_sub')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

export default function Markets() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.1);

  const langs = [
    { key: 'markets_lang_en', active: true },
    { key: 'markets_lang_es', active: true },
    { key: 'markets_lang_zh', active: false },
  ];

  return (
    <section id="markets" ref={ref} className="bg-white py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              {t('markets_label')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6 leading-tight">
              {t('markets_title')}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              {t('markets_text')}
            </p>

            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              {t('markets_lang_title')}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {langs.map((lang) => (
                <span
                  key={lang.key}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    lang.active
                      ? 'bg-accent/10 text-primary'
                      : 'border border-dashed border-gray-200 text-gray-400'
                  }`}
                >
                  {lang.active && <i className="ri-check-line text-accent" />}
                  {t(lang.key)}
                </span>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative rounded-2xl overflow-hidden h-56 md:h-64">
              <img
                src="https://readdy.ai/api/search-image?query=Stylized%20illustration%20of%20international%20travel%20connection%20between%20Asia%20and%20Chile%2C%20flight%20paths%20over%20a%20world%20map%20with%20warm%20amber%20and%20crimson%20accents%2C%20modern%20minimal%20editorial%20style&width=1000&height=640&seq=slh-markets-asia&orientation=landscape"
                alt={t('markets_asia_title')}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <h3 className="absolute bottom-5 left-5 right-5 font-display text-xl md:text-2xl text-white font-bold">
                {t('markets_asia_title')}
              </h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mt-6">
              {t('markets_asia_text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

const upcoming = [
  {
    key: 'u1',
    img: 'https://readdy.ai/api/search-image?query=Beginner%20salsa%20dance%20class%20in%20a%20bright%20modern%20studio%20with%20mirrored%20wall%20in%20Santiago%20Chile%2C%20instructor%20guiding%20small%20group%20of%20travelers%2C%20warm%20natural%20light%2C%20candid%20photography&width=800&height=600&seq=slh-up-salsa&orientation=landscape',
  },
  {
    key: 'u2',
    img: 'https://readdy.ai/api/search-image?query=Latin%20dance%20social%20on%20a%20rooftop%20terrace%20at%20night%20overlooking%20Santiago%20Chile%20city%20lights%2C%20small%20crowd%20dancing%20under%20string%20lights%2C%20warm%20amber%20glow%2C%20cinematic%20travel%20photography&width=800&height=600&seq=slh-up-rooftop&orientation=landscape',
  },
];

export default function Tonight() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.1);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tonight" ref={ref} className="bg-surface py-16 md:py-24 lg:py-28">
      <div className="section-padding">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-accent" />
            </span>
            {t('tonight_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4 leading-tight">
            {t('tonight_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t('tonight_subtitle')}
          </p>
        </div>

        {/* Featured */}
        <div className={`max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row">
            <div className="relative lg:w-1/2 h-56 sm:h-72 lg:h-auto overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=People%20dancing%20bachata%20in%20a%20warm%20intimate%20social%20dance%20venue%20in%20Santiago%20Chile%2C%20string%20lights%20and%20wooden%20floor%2C%20joyful%20atmosphere%2C%20motion%20blur%2C%20candid%20documentary%20photography%2C%20amber%20and%20crimson%20tones&width=1000&height=760&seq=slh-tonight-bachata&orientation=landscape"
                alt={t('tonight_main_title')}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                <i className="ri-flashlight-fill text-xs" />
                {t('tonight_live')}
              </span>
            </div>
            <div className="lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-accent text-sm font-semibold mb-2">{t('tonight_main_when')}</span>
              <h3 className="font-display text-2xl md:text-3xl text-primary font-bold mb-3">
                {t('tonight_main_title')}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {t('tonight_main_desc')}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
                <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                  <i className="ri-group-line text-accent" />
                  {t('tonight_main_spots')}
                </span>
                <span className="font-display text-2xl text-primary font-bold">{t('tonight_main_price')}</span>
              </div>
              <button
                onClick={() => scrollTo('#reserva')}
                className="inline-flex items-center justify-center gap-2 self-start px-7 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap"
              >
                <span>{t('tonight_book')}</span>
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="max-w-5xl mx-auto mt-10 md:mt-14">
          <h3 className="font-display text-lg md:text-xl text-primary font-bold mb-5">
            {t('tonight_upcoming_title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {upcoming.map((item, index) => (
              <div
                key={item.key}
                className={`group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 flex flex-col sm:flex-row ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 120}ms` }}
              >
                <div className="relative sm:w-2/5 h-40 sm:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={item.img}
                    alt={t(`tonight_${item.key}_title`)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="sm:w-3/5 p-5">
                  <span className="text-accent text-xs font-semibold">{t(`tonight_${item.key}_when`)}</span>
                  <h4 className="font-display text-base md:text-lg text-primary font-bold mt-1 mb-2">
                    {t(`tonight_${item.key}_title`)}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    {t(`tonight_${item.key}_desc`)}
                  </p>
                  <span className="text-primary text-xs font-medium">{t(`tonight_${item.key}_meta`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
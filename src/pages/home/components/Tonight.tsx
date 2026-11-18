import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useInView from '@/hooks/useInView';

export default function Tonight() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/experiencia/bachata')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{t('tonight_view_detail')}</span>
                  <i className="ri-arrow-right-line" />
                </button>
                <button
                  onClick={() => scrollTo('#reserva')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-primary/15 text-primary font-semibold rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-calendar-check-line" />
                  <span>{t('tonight_book')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
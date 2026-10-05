import { useTranslation } from 'react-i18next';

export default function Closing() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cierre" className="relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Cinematic%20night%20view%20of%20Santiago%20Chile%20with%20glowing%20city%20lights%20and%20silhouettes%20of%20a%20couple%20dancing%20salsa%20in%20the%20foreground%2C%20warm%20amber%20and%20crimson%20tones%2C%20dramatic%20contrast%2C%20artistic%20travel%20photography&width=1920&height=1080&seq=slh-closing-night&orientation=landscape"
          alt="Santiago by night"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/80" />
      </div>

      <div className="relative z-10 section-padding text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-warm-light font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-5">
            {t('closing_label')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-5">
            {t('closing_title')}
          </h2>
          <p className="font-display text-xl md:text-2xl text-white/85 font-medium mb-10">
            {t('closing_sub')}
          </p>

          <a
            href="#tonight"
            onClick={(e) => { e.preventDefault(); scrollTo('#tonight'); }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all hover:scale-105 whitespace-nowrap"
          >
            <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-live-line text-sm" />
            </span>
            <span>{t('closing_cta')}</span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10">
            <a
              href="#reserva"
              onClick={(e) => { e.preventDefault(); scrollTo('#reserva'); }}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              {t('closing_link_book')}
            </a>
            <span className="text-white/25">|</span>
            <a
              href="#partners"
              onClick={(e) => { e.preventDefault(); scrollTo('#partners'); }}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              {t('closing_link_partner')}
            </a>
            <span className="text-white/25">|</span>
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); scrollTo('#contacto'); }}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              {t('closing_link_contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
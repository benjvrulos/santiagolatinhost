import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://public.readdy.ai/ai/img_res/edited_856d0c0a3e7a02159cb1bedb9122fda5_2080798d.jpg"
          alt="Santiago de Chile cityscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding pt-20 pb-16 flex flex-col items-center justify-center text-center">
        <div className={`max-w-4xl transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-warm-light text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4">
            Santiago Latin Host
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-tight mb-4 md:mb-6">
            {t('hero_h1')}
          </h1>
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-display font-medium mb-4 md:mb-6">
            {t('hero_h2')}
          </p>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Emotional quote */}
          <p className="text-warm-light text-base md:text-lg font-medium italic mb-8 md:mb-10 max-w-xl mx-auto">
            {t('hero_quote')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#reserva"
              onClick={(e) => { e.preventDefault(); scrollTo('#reserva'); }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all hover:scale-105 whitespace-nowrap"
            >
              <span>{t('hero_cta_book')}</span>
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-arrow-right-line text-sm" />
              </span>
            </a>
            <a
              href="#ruta"
              onClick={(e) => { e.preventDefault(); scrollTo('#ruta'); }}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
            >
              <span>{t('hero_cta_route')}</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-xs tracking-wider uppercase">Scroll</span>
            <i className="ri-arrow-down-line text-white/60 text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
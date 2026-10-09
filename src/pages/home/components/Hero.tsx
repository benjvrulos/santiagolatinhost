import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const langOptions = [
    { code: "en", label: t("hero_lang_en") },
    { code: "es", label: t("hero_lang_es") },
    { code: "zh", label: t("hero_lang_zh") },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Stylized%20artistic%20night%20scene%20of%20Santiago%20Chile%20skyline%20with%20warm%20glowing%20city%20lights%20and%20a%20blurred%20couple%20dancing%20salsa%20in%20the%20foreground%2C%20cinematic%20moody%20atmosphere%2C%20deep%20crimson%20and%20amber%20tones%2C%20dramatic%20contrast%2C%20editorial%20travel%20photography&width=1920&height=1080&seq=slh-hero-night&orientation=landscape"
          alt="Santiago de Chile by night with Latin dance"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding pt-24 pb-16 flex flex-col items-center justify-center text-center">
        <div
          className={`max-w-4xl w-full transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Language row */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 text-xs sm:text-sm">
            {langOptions.map((opt, index) => (
              <span key={opt.code} className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => changeLang(opt.code)}
                  className={`cursor-pointer transition-colors ${
                    i18n.language === opt.code
                      ? "text-white font-semibold"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {opt.label}
                </button>
                {index < langOptions.length - 1 && (
                  <span className="text-white/30">|</span>
                )}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.05] mb-5 md:mb-6">
            {t("hero_h1")}
          </h1>
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-4 leading-relaxed">
            {t("hero_subtitle")}
          </p>
          <p className="text-warm-light text-sm md:text-base font-medium mb-8 md:mb-10">
            {t("hero_trust")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href="#tonight"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#tonight");
              }}
              className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all hover:scale-105 whitespace-nowrap"
            >
              <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-live-line text-sm" />
              </span>
              <span>{t("hero_cta_tonight")}</span>
            </a>
            <a
              href="#experiences"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#experiences");
              }}
              className="inline-flex items-center gap-3 px-7 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {t("hero_cta_explore")}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/50 text-xs tracking-wider uppercase">
              Scroll
            </span>
            <i className="ri-arrow-down-line text-white/50 text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

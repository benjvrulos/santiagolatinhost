import { useTranslation } from "react-i18next";
import useInView from "@/hooks/useInView";

export default function Recognition() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.08);

  return (
    <section
      id="recognition"
      ref={ref}
      className="relative bg-primary-dark py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute -top-24 right-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="section-padding relative">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="inline-flex items-center gap-2 text-warm-light font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            <i className="ri-award-line" />
            {t("recog_label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">
            {t("recog_title")}
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            {t("recog_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 max-w-5xl mx-auto">
          {/* Sercotec */}
          <article
            className={`rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="w-[150px] h-[64px] rounded-lg bg-white flex items-center justify-center px-4 flex-shrink-0">
                <img
                  src="images/Logo_Sercotec.png"
                  alt="Sercotec"
                  className="font-display text-primary font-bold text-xl tracking-tight leading-none"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 bg-accent/15 text-accent-light text-[11px] font-semibold px-2.5 py-1.5 rounded-full whitespace-nowrap">
                <i className="ri-checkbox-circle-fill text-xs" />
                {t("recog_sercotec_badge")}
              </span>
            </div>

            <p className="text-warm-light text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              {t("recog_sercotec_kicker")}
            </p>
            <h3 className="font-display text-xl md:text-2xl text-white font-bold mb-3 leading-tight">
              {t("recog_sercotec_title")}
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              {t("recog_sercotec_text")}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 border-t border-white/10">
              <span className="inline-flex items-center gap-1.5 text-white/50 text-xs">
                <i className="ri-government-line text-accent" />
                {t("recog_sercotec_meta1")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/50 text-xs">
                <i className="ri-calendar-check-line text-accent" />
                {t("recog_sercotec_meta2")}
              </span>
            </div>
          </article>

          {/* Rocketbot */}
          <article
            className={`rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="w-[150px] h-[64px] rounded-lg bg-white flex items-center justify-center gap-1.5 px-4 flex-shrink-0">
                <i className="ri-robot-2-line text-lg text-primary" />
                <img
                  src="images/rocketbot.png"
                  alt="Rocketbot"
                  className="font-body text-primary font-bold text-lg tracking-tight leading-none"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 bg-warm/15 text-warm-light text-[11px] font-semibold px-2.5 py-1.5 rounded-full whitespace-nowrap">
                <i className="ri-flask-line text-xs" />
                {t("recog_rocketbot_badge")}
              </span>
            </div>

            <p className="text-warm-light text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              {t("recog_rocketbot_kicker")}
            </p>
            <h3 className="font-display text-xl md:text-2xl text-white font-bold mb-3 leading-tight">
              {t("recog_rocketbot_title")}
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              {t("recog_rocketbot_text")}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 border-t border-white/10">
              <span className="inline-flex items-center gap-1.5 text-white/50 text-xs">
                <i className="ri-flow-chart text-warm-light" />
                {t("recog_rocketbot_meta1")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/50 text-xs">
                <i className="ri-time-line text-warm-light" />
                {t("recog_rocketbot_meta2")}
              </span>
            </div>
          </article>
        </div>

        <p
          className={`max-w-3xl mx-auto mt-8 flex items-start gap-2 text-white/35 text-xs leading-relaxed transition-all duration-1000 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <i className="ri-information-line mt-0.5 text-warm-light" />
          {t("recog_disclaimer")}
        </p>
      </div>
    </section>
  );
}

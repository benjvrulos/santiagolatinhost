import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useInView from "@/hooks/useInView";
import ConceptModal, { type ConceptCategory } from "./ConceptModal";

const categories: ConceptCategory[] = [
  {
    id: "latin-night",
    img: "https://readdy.ai/api/search-image?query=Vibrant%20Latin%20nightclub%20in%20Santiago%20Chile%20at%20night%2C%20crowd%20dancing%20salsa%20under%20warm%20red%20and%20amber%20lights%2C%20energetic%20motion%2C%20cinematic%20nightlife%20photography&width=900&height=700&seq=slh-choose-latin-night&orientation=landscape",
    badgeKey: "cs1_badge",
    titleKey: "cs1_title",
    descKey: "cs1_desc",
    conceptKey: "cs1_concept",
    highlightKeys: ["cs1_h1", "cs1_h2", "cs1_h3"],
  },
  {
    id: "culture-dance",
    img: "https://readdy.ai/api/search-image?query=Colorful%20heritage%20street%20in%20Santiago%20Chile%20in%20warm%20afternoon%20light%20with%20colonial%20architecture%2C%20a%20couple%20dancing%20in%20the%20distance%2C%20artistic%20editorial%20travel%20photography&width=900&height=700&seq=slh-choose-culture&orientation=landscape",
    badgeKey: "cs2_badge",
    titleKey: "cs2_title",
    descKey: "cs2_desc",
    conceptKey: "cs2_concept",
    highlightKeys: ["cs2_h1", "cs2_h2", "cs2_h3"],
  },
  {
    id: "private",
    img: "https://readdy.ai/api/search-image?query=Elegant%20couple%20enjoying%20an%20exclusive%20private%20latin%20dance%20experience%20in%20an%20upscale%20Santiago%20Chile%20venue%2C%20city%20skyline%20in%20the%20background%2C%20warm%20sophisticated%20lighting%2C%20premium%20travel%20photography&width=900&height=700&seq=slh-choose-private&orientation=landscape",
    badgeKey: "cs3_badge",
    titleKey: "cs3_title",
    descKey: "cs3_desc",
    conceptKey: "cs3_concept",
    highlightKeys: ["cs3_h1", "cs3_h2", "cs3_h3"],
  },
];

const packages = [
  {
    id: "paseo",
    img: "https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/d95d880e-731e-4ffc-8164-ebc7619a7f22_barrio-lastarria-hero.jpg?v=a306b20921552eeeb5f74fbac60cc56d",
    titleKey: "exp1_title",
    descKey: "exp1_desc",
    purposeKey: "exp1_purpose",
    priceKey: "exp1_price",
    durationKey: "exp1_duration_card",
  },
  {
    id: "noche",
    img: "https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/f67d257d-40c2-4e72-bf67-593b269d4f0a_patio-bellavista.webp?v=16dc815b05371bbc734b392afb502d3f",
    titleKey: "exp2_title",
    descKey: "exp2_desc",
    purposeKey: "exp2_purpose",
    priceKey: "exp2_price",
    durationKey: "exp2_duration_card",
  },
  {
    id: "expats",
    img: "https://public.readdy.ai/ai/img_res/edited_97e3f05ebb787817aded770dbefbecc8_c429d3e4.jpg",
    titleKey: "exp3_title",
    descKey: "exp3_desc",
    purposeKey: "exp3_purpose",
    priceKey: "exp3_price",
    durationKey: "exp3_duration_card",
  },
  {
    id: "privado",
    img: "https://readdy.ai/api/search-image?query=Couple%20walking%20hand%20in%20hand%20through%20elegant%20heritage%20street%20in%20Santiago%20Chile%20warm%20golden%20hour%20light%20colonial%20architecture%20romantic%20atmosphere%20sophisticated%20travel%20photography&width=800&height=600&seq=exp4-private&orientation=landscape",
    titleKey: "exp4_title",
    descKey: "exp4_desc",
    purposeKey: "exp4_purpose",
    priceKey: "exp4_price",
    durationKey: "exp4_duration_card",
  },
  {
    id: "noche_premium",
    img: "https://readdy.ai/api/search-image?query=Luxury%20evening%20in%20upscale%20Santiago%20Chile%20lounge%20elegant%20Latin%20dance%20club%20with%20ambient%20lighting%20champagne%20glasses%20sophisticated%20crowd%20latin%20music%20atmosphere%20premium%20nightlife%20photography&width=800&height=600&seq=exp5-premium-night&orientation=landscape",
    titleKey: "exp5_title",
    descKey: "exp5_desc",
    purposeKey: "exp5_purpose",
    priceKey: "exp5_price",
    durationKey: "exp5_duration_card",
  },
  {
    id: "privado_premium",
    img: "https://readdy.ai/api/search-image?query=Exclusive%20private%20Latin%20dance%20experience%20in%20Santiago%20Chile%20elegant%20couple%20dancing%20salsa%20in%20upscale%20venue%20with%20city%20skyline%20backdrop%20luxury%20travel%20concierge%20service%20photography%20warm%20sophisticated%20lighting&width=800&height=600&seq=exp6-premium-private&orientation=landscape",
    titleKey: "exp6_title",
    descKey: "exp6_desc",
    purposeKey: "exp6_purpose",
    priceKey: "exp6_price",
    durationKey: "exp6_duration_card",
  },
];

export default function ChooseSantiago() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, visible } = useInView(0.08);
  const [showAll, setShowAll] = useState(false);
  const [preview, setPreview] = useState<ConceptCategory | null>(null);

  return (
    <section
      id="experiences"
      ref={ref}
      className="bg-white py-16 md:py-24 lg:py-28"
    >
      <div className="section-padding">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t("choose_label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4 leading-tight">
            {t("choose_title")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t("choose_subtitle")}
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setPreview(cat)}
              className={`group relative text-left rounded-2xl overflow-hidden h-72 md:h-80 cursor-pointer transition-all duration-700 hover:-translate-y-1 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <img
                src={cat.img}
                alt={t(cat.titleKey)}
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <span className="absolute top-4 left-4 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                {t(cat.badgeKey)}
              </span>
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-accent text-white text-[11px] md:text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                <i className="ri-time-line text-xs" />
                {t("choose_soon")}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl text-white font-bold mb-2">
                  {t(cat.titleKey)}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  {t(cat.descKey)}
                </p>
                <span className="inline-flex items-center gap-2 text-warm-light text-sm font-semibold">
                  {t("exp_cta")}
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Toggle */}
        <div className="text-center mt-10 md:mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary/15 text-primary font-semibold rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
          >
            {showAll ? t("choose_hide") : t("choose_cta")}
            <i
              className={`ri-arrow-down-s-line transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* All packages (expandable) */}
        <div
          className={`overflow-hidden transition-all duration-700 ${showAll ? "max-h-[2000px] opacity-100 mt-12" : "max-h-0 opacity-0"}`}
        >
          <h3 className="font-display text-xl md:text-2xl text-primary font-bold text-center mb-8">
            {t("choose_all_title")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {packages.map((exp) => (
              <div
                key={exp.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/experiencia/${exp.id}`)}
              >
                <div className="relative h-52 md:h-60 overflow-hidden">
                  <img
                    src={exp.img}
                    alt={t(exp.titleKey)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {t(exp.durationKey)}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h4 className="font-display text-lg md:text-xl text-primary font-bold mb-2 leading-tight">
                    {t(exp.titleKey)}
                  </h4>
                  <p className="text-accent text-base font-bold mb-3">
                    {t(exp.priceKey)}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base mb-3 leading-relaxed">
                    {t(exp.descKey)}
                  </p>
                  <p className="text-accent/80 text-sm font-medium italic mb-4">
                    {t(exp.purposeKey)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent transition-colors whitespace-nowrap">
                    {t("exp_cta")}
                    <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConceptModal category={preview} onClose={() => setPreview(null)} />
    </section>
  );
}

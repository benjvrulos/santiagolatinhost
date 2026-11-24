import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import BookingForm from "@/pages/experience-detail/components/BookingForm";
import { resolveExperience, resolveRelated } from "@/lib/experienceDetail";

const salsaVenues = [
  {
    name: "Tierra Dura",
    descKey: "venue_tierra_dura_desc",
    style: "Salsa y Timba",
  },
  {
    name: "Orixas",
    descKey: "venue_orixas_desc",
    style: "Salsa, Bachata y Son",
  },
  {
    name: "La Havana",
    descKey: "venue_la_havana_desc",
    style: "Salsa Cubana y Casino",
  },
];

const paseoLandmarks = [
  {
    name: "Plaza de Armas / Catedral Metropolitana",
    img: "https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/5575b35b-b715-47e4-8f54-03345149cfd0_plaza_de_armas.jpg?v=40cdd5eddd1cfdca37d3121e244d5985",
    descKey: "landmark_plaza_desc",
  },
  {
    name: "Palacio de La Moneda",
    img: "https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/7526be25-6382-4fe2-89be-8414bcfa7f68_palacio_la_moneda.jpg?v=a3a749c2ebbaf806069b8bd70dc39ce0",
    descKey: "landmark_lamoneda_desc",
  },
  {
    name: "GAM / Centro Cultural Gabriela Mistral",
    img: "https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/aec3cb33-a846-4fd9-8733-ea998afbaac7_gam.jpg?v=34ec7fd5b67663612f250410d2006320",
    descKey: "landmark_gam_desc",
  },
  {
    name: "Barrio Lastarria",
    img: "https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/cc5e3b55-8e43-40e8-9d1c-492c0931b30e_barriolastarria.webp?v=675456ab49f65441d5d5709be67147d3",
    descKey: "landmark_lastarria_desc",
  },
  {
    name: "Cerro Santa Lucía",
    img: "https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/fe64b35e-4413-4272-9f59-665db6c66f5c_Cerro_Santa_Luca_Santiago.jpg?v=80e7029c4781d452e5351f90cee51051",
    descKey: "landmark_santalucia_desc",
  },
  {
    name: "Clase de Baile Latino",
    img: "https://readdy.ai/api/search-image?query=Salsa%20dance%20class%20in%20a%20bright%20studio%20in%20Santiago%20Chile%20instructor%20teaching%20foreign%20tourists%20basic%20steps%20wooden%20dance%20floor%20mirrors%20on%20walls%20warm%20atmosphere%20candid%20photography&width=800&height=500&seq=exp1g5&orientation=landscape",
    descKey: "landmark_dance_desc",
  },
];

const FALLBACK_IMG =
  "https://readdy.ai/api/search-image?query=Warm%20golden%20hour%20light%20over%20a%20curated%20local%20experience%20in%20Chile%2C%20small%20group%20of%20travelers%20with%20a%20bilingual%20host%2C%20editorial%20travel%20photography%2C%20soft%20amber%20and%20terracotta%20tones%2C%20natural%20texture%2C%20welcoming%20atmosphere&width=800&height=600&seq=exp-related-fallback&orientation=landscape";

export default function ExperienceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  const exp = resolveExperience(id, t);
  const related = resolveRelated(id, t);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [exp]);

  if (!exp) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="flex items-center justify-center py-32 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-white">
              <i className="ri-compass-3-line text-2xl text-accent" />
            </div>
            <h1 className="font-display text-2xl text-primary font-bold mb-3">
              {t("exp_not_found_title")}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {t("exp_not_found_desc")}
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line" />
              {t("exp_back_to_list")}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[70vh] md:h-[80vh] overflow-hidden"
      >
        <img
          src={exp.img}
          alt={exp.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 xl:px-12 pb-10 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line" />
              {t("exp_back_to_list")}
            </button>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight max-w-3xl">
              {exp.title}
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {exp.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Main */}
            <div className="lg:w-2/3">
              {/* Description */}
              <div
                id="desc"
                data-animate
                className={`mb-12 transition-all duration-700 ${visibleSections.desc ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="prose">
                  {exp.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-4 last:mb-0 text-gray-600 text-sm md:text-base leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div
                id="itinerary"
                data-animate
                className={`mb-12 transition-all duration-700 delay-100 ${visibleSections.itinerary ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-6">
                  {t("exp_label_itinerary")}
                </h2>
                <div className="space-y-0">
                  {exp.itinerary.map((item, i) => (
                    <div key={i} className="flex gap-4 md:gap-6 pb-6 relative">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-accent text-xs font-bold">
                            {i + 1}
                          </span>
                        </div>
                        {i < exp.itinerary.length - 1 && (
                          <div className="w-px flex-1 bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="pt-1">
                        <span className="text-accent text-sm font-semibold">
                          {item.time}
                        </span>
                        <p className="text-gray-600 text-sm md:text-base mt-1 leading-relaxed">
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salsa Venues - only for Latin Night */}
              {id === "noche" && (
                <div
                  id="venues"
                  data-animate
                  className={`mb-12 transition-all duration-700 delay-150 ${visibleSections.venues ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-6">
                    {t("exp_label_venues")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {salsaVenues.map((venue) => (
                      <div
                        key={venue.name}
                        className="bg-white rounded-xl p-5 md:p-6 border border-gray-100 hover:border-accent/30 transition-colors"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 mb-3">
                          <i className="ri-music-2-line text-accent text-lg" />
                        </div>
                        <h3 className="font-display text-base text-primary font-bold mb-1">
                          {venue.name}
                        </h3>
                        <p className="text-accent text-xs font-medium mb-2">
                          {venue.style}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {t(venue.descKey)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Paseo Landmarks */}
              {id === "paseo" && (
                <div
                  id="landmarks"
                  data-animate
                  className={`mb-12 transition-all duration-700 delay-150 ${visibleSections.landmarks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-6">
                    {t("exp_label_landmarks")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paseoLandmarks.map((landmark) => (
                      <div
                        key={landmark.name}
                        className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-accent/30 transition-colors"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={landmark.img}
                            alt={landmark.name}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-display text-white text-sm md:text-base font-bold">
                              {landmark.name}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 md:p-5">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {t(landmark.descKey)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {exp.gallery.length > 0 && (
                <div
                  id="gallery"
                  data-animate
                  className={`mb-12 transition-all duration-700 delay-200 ${visibleSections.gallery ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-6">
                    {t("exp_label_gallery")}
                  </h2>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {exp.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                      >
                        <img
                          src={img}
                          alt={`${exp.title} ${i + 1}`}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Purpose */}
              <div
                id="purpose"
                data-animate
                className={`mb-12 p-6 md:p-8 bg-white rounded-xl border-l-4 border-accent transition-all duration-700 delay-300 ${visibleSections.purpose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
                  {t("exp_label_purpose")}
                </p>
                <p className="text-primary text-base md:text-lg font-medium leading-relaxed italic">
                  {exp.purpose}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                  <div className="space-y-4">
                    {exp.date && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                          <i className="ri-calendar-line text-accent text-sm" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider">
                            {t("exp_label_date")}
                          </p>
                          <p className="text-primary text-sm font-medium">
                            {exp.date}
                          </p>
                        </div>
                      </div>
                    )}
                    {exp.schedule && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                          <i className="ri-time-line text-accent text-sm" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider">
                            {t("exp_label_schedule")}
                          </p>
                          <p className="text-primary text-sm font-medium">
                            {exp.schedule}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                        <i className="ri-timer-line text-accent text-sm" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          {t("exp_label_duration")}
                        </p>
                        <p className="text-primary text-sm font-medium">
                          {exp.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                        <i className="ri-group-line text-accent text-sm" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          {t("exp_label_group")}
                        </p>
                        <p className="text-primary text-sm font-medium">
                          {exp.groupSize}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                        <i className="ri-translate text-accent text-sm" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          {t("exp_label_language")}
                        </p>
                        <p className="text-primary text-sm font-medium">
                          {exp.language}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                        <i className="ri-map-pin-line text-accent text-sm" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          {t("exp_label_meeting")}
                        </p>
                        <p className="text-primary text-sm font-medium">
                          {exp.meetingPoint}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                    {t("exp_label_includes")}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {exp.includes}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                    {t("exp_label_not_includes")}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {exp.notIncludes}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                    {t("exp_label_price")}
                  </p>
                  {exp.priceAmount ? (
                    <>
                      <p className="font-display text-2xl md:text-3xl text-primary font-bold leading-none">
                        {exp.priceAmount}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {exp.priceUnit || t("exp_label_price_unit")}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.priceNote}
                    </p>
                  )}
                </div>

                {exp.requirements && (
                  <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      {t("exp_label_requirements")}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.requirements}
                    </p>
                  </div>
                )}

                {exp.recommendations && (
                  <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      {t("exp_label_recommendations")}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.recommendations}
                    </p>
                  </div>
                )}

                <button
                  onClick={() =>
                    document
                      .getElementById("reserva")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block w-full text-center whitespace-nowrap text-sm font-semibold px-5 py-3 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors cursor-pointer"
                >
                  {t("exp_cta_book")}
                </button>
                <a
                  href="https://wa.me/56923895542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center whitespace-nowrap text-sm font-medium px-5 py-3 rounded-full border border-gray-200 text-primary hover:border-accent hover:text-accent transition-colors"
                >
                  {t("exp_cta_whatsapp")}
                </a>
                <a
                  href="https://www.instagram.com/chilelatinhost/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center whitespace-nowrap text-sm font-medium px-5 py-3 rounded-full border border-gray-200 text-primary hover:border-pink-500 hover:text-pink-500 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <i className="ri-instagram-line" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking form */}
      <BookingForm currentId={id} />

      {/* Related */}
      {related.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-8">
              {t("exp_label_related")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {related.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => navigate(`/experiencia/${rel.id}`)}
                  className="group text-left bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={rel.img || FALLBACK_IMG}
                      alt={rel.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-base md:text-lg text-primary font-bold mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

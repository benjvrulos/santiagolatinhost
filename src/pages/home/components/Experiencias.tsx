import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const highlights = [
  { icon: 'ri-translate-2', textKey: 'ruta_highlight1' },
  { icon: 'ri-music-2-line', textKey: 'ruta_highlight2' },
  { icon: 'ri-star-smile-line', textKey: 'ruta_highlight3' },
  { icon: 'ri-shield-check-line', textKey: 'ruta_highlight4' },
  { icon: 'ri-team-line', textKey: 'ruta_highlight5' },
  { icon: 'ri-heart-line', textKey: 'ruta_highlight6' },
  { icon: 'ri-smartphone-line', textKey: 'ruta_highlight7' },
];

const experiences = [
  { id: 'paseo', img: 'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/d95d880e-731e-4ffc-8164-ebc7619a7f22_barrio-lastarria-hero.jpg?v=a306b20921552eeeb5f74fbac60cc56d', titleKey: 'exp1_title', descKey: 'exp1_desc', purposeKey: 'exp1_purpose', priceKey: 'exp1_price', durationKey: 'exp1_duration_card', tag: null },
  { id: 'noche', img: 'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/f67d257d-40c2-4e72-bf67-593b269d4f0a_patio-bellavista.webp?v=16dc815b05371bbc734b392afb502d3f', titleKey: 'exp2_title', descKey: 'exp2_desc', purposeKey: 'exp2_purpose', priceKey: 'exp2_price', durationKey: 'exp2_duration_card', tag: null },
  { id: 'expats', img: 'https://public.readdy.ai/ai/img_res/edited_97e3f05ebb787817aded770dbefbecc8_c429d3e4.jpg', titleKey: 'exp3_title', descKey: 'exp3_desc', purposeKey: 'exp3_purpose', priceKey: 'exp3_price', durationKey: 'exp3_duration_card', tag: null },
  { id: 'privado', img: 'https://readdy.ai/api/search-image?query=Couple%20walking%20hand%20in%20hand%20through%20elegant%20heritage%20street%20in%20Santiago%20Chile%20warm%20golden%20hour%20light%20colonial%20architecture%20romantic%20atmosphere%20sophisticated%20travel%20photography&width=800&height=600&seq=exp4-private&orientation=landscape', titleKey: 'exp4_title', descKey: 'exp4_desc', purposeKey: 'exp4_purpose', priceKey: 'exp4_price', durationKey: 'exp4_duration_card', tag: 'Privado' },
  { id: 'noche_premium', img: 'https://readdy.ai/api/search-image?query=Luxury%20evening%20in%20upscale%20Santiago%20Chile%20lounge%20elegant%20Latin%20dance%20club%20with%20ambient%20lighting%20champagne%20glasses%20sophisticated%20crowd%20latin%20music%20atmosphere%20premium%20nightlife%20photography&width=800&height=600&seq=exp5-premium-night&orientation=landscape', titleKey: 'exp5_title', descKey: 'exp5_desc', purposeKey: 'exp5_purpose', priceKey: 'exp5_price', durationKey: 'exp5_duration_card', tag: 'Premium' },
  { id: 'privado_premium', img: 'https://readdy.ai/api/search-image?query=Exclusive%20private%20Latin%20dance%20experience%20in%20Santiago%20Chile%20elegant%20couple%20dancing%20salsa%20in%20upscale%20venue%20with%20city%20skyline%20backdrop%20luxury%20travel%20concierge%20service%20photography%20warm%20sophisticated%20lighting&width=800&height=600&seq=exp6-premium-private&orientation=landscape', titleKey: 'exp6_title', descKey: 'exp6_desc', purposeKey: 'exp6_purpose', priceKey: 'exp6_price', durationKey: 'exp6_duration_card', tag: 'Premium Privado' },
];

export default function Experiencias() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ruta" ref={sectionRef} className="bg-surface py-16 md:py-24 lg:py-32">
      <div className="section-padding">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 md:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('ruta_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-5 leading-tight">
            {t('ruta_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
            {t('ruta_subtitle')}
          </p>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            {t('ruta_text')}
          </p>
        </div>

        {/* Highlights */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-14 md:mb-20 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {highlights.map((h, index) => (
            <div
              key={h.textKey}
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-3"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                <i className={`${h.icon} text-sm text-accent`} />
              </div>
              <span className="text-primary text-sm font-medium">{t(h.textKey)}</span>
            </div>
          ))}
        </div>

        {/* Experience Cards - 6 cards, 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
              onClick={() => navigate(`/experiencia/${exp.id}`)}
            >
              <div className="relative h-52 md:h-60 overflow-hidden">
                <img
                  src={exp.img}
                  alt={t(exp.titleKey)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {exp.tag && (
                  <span className="absolute top-3 right-3 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.tag}
                  </span>
                )}
                <div className="absolute bottom-3 left-4">
                  <span className="bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {t(exp.durationKey)}
                  </span>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-display text-lg md:text-xl text-primary font-bold mb-2 leading-tight">
                  {t(exp.titleKey)}
                </h3>
                <p className="text-accent text-base font-bold mb-3 whitespace-nowrap">
                  {t(exp.priceKey)}
                </p>
                <p className="text-gray-600 text-sm md:text-base mb-3 leading-relaxed">
                  {t(exp.descKey)}
                </p>
                <p className="text-accent/80 text-sm font-medium italic mb-4">
                  {t(exp.purposeKey)}
                </p>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors whitespace-nowrap">
                  {t('exp_cta')}
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

const reels = [
  { labelKey: 'reel1_label', img: 'https://readdy.ai/api/search-image?query=Zouk%20dancers%20in%20a%20moody%20dance%20studio%20in%20Santiago%20Chile%2C%20dramatic%20crimson%20and%20amber%20stage%20lighting%2C%20flowing%20motion%20blur%2C%20artistic%20dance%20photography&width=600&height=800&seq=slh-reel-zouk&orientation=portrait' },
  { labelKey: 'reel2_label', img: 'https://readdy.ai/api/search-image?query=Couple%20dancing%20bachata%20close%20together%20in%20a%20warm%20intimate%20social%20venue%20in%20Santiago%20Chile%2C%20soft%20string%20lights%2C%20romantic%20mood%2C%20cinematic%20photography&width=600&height=800&seq=slh-reel-bachata&orientation=portrait' },
  { labelKey: 'reel3_label', img: 'https://readdy.ai/api/search-image?query=Bright%20salsa%20dance%20class%20in%20a%20modern%20studio%20in%20Santiago%20Chile%2C%20smiling%20students%20following%20an%20instructor%2C%20mirrors%20and%20wooden%20floor%2C%20energetic%20candid%20photography&width=600&height=800&seq=slh-reel-salsa&orientation=portrait' },
  { labelKey: 'reel4_label', img: 'https://readdy.ai/api/search-image?query=Social%20dance%20floor%20full%20of%20people%20dancing%20salsa%20in%20Santiago%20Chile%2C%20warm%20amber%20lights%2C%20joyful%20energy%2C%20candid%20documentary%20photography&width=600&height=800&seq=slh-reel-social&orientation=portrait' },
  { labelKey: 'reel5_label', img: 'https://readdy.ai/api/search-image?query=Santiago%20Chile%20city%20skyline%20at%20night%20with%20glowing%20lights%20and%20neon%20reflections%2C%20moody%20atmospheric%20urban%20photography%2C%20warm%20and%20crimson%20tones&width=600&height=800&seq=slh-reel-night&orientation=portrait' },
  { labelKey: 'reel6_label', img: 'https://readdy.ai/api/search-image?query=Group%20of%20happy%20dancers%20laughing%20together%20after%20a%20salsa%20night%20in%20Santiago%20Chile%2C%20warm%20inviting%20atmosphere%2C%20authentic%20candid%20photography&width=600&height=800&seq=slh-reel-community&orientation=portrait' },
];

export default function Reels() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.08);

  return (
    <section id="reels" ref={ref} className="bg-primary py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-warm-light font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('reels_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">
            {t('reels_title')}
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            {t('reels_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
          {reels.map((reel, index) => (
            <a
              key={reel.labelKey}
              href="https://www.instagram.com/santiagolatinhost/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-xl overflow-hidden aspect-[9/16] transition-all duration-700 hover:-translate-y-1 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={reel.img}
                alt={t(reel.labelKey)}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm group-hover:bg-accent transition-colors">
                  <i className="ri-play-fill text-white text-xl" />
                </span>
              </span>
              <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                {t(reel.labelKey)}
              </span>
            </a>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <a
            href="https://www.instagram.com/santiagolatinhost/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white font-semibold rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <i className="ri-instagram-line" />
            {t('reels_cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const painPoints = [
  { icon: 'ri-map-pin-5-line', textKey: 'problem_point1' },
  { icon: 'ri-translate', textKey: 'problem_point2' },
  { icon: 'ri-shield-flash-line', textKey: 'problem_point3' },
  { icon: 'ri-user-unfollow-line', textKey: 'problem_point4' },
];

export default function Problema() {
  const { t } = useTranslation();
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
    <section id="problema" ref={sectionRef} className="bg-surface py-20 md:py-28 lg:py-36">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              {t('problem_label')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6 leading-tight">
              {t('problem_title')}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {t('problem_text')}
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {painPoints.map((point, index) => (
              <div
                key={point.textKey}
                className="bg-white rounded-xl p-5 md:p-6 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 mb-3">
                  <i className={`${point.icon} text-lg text-accent`} />
                </div>
                <p className="text-primary text-sm font-medium leading-relaxed">
                  {t(point.textKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
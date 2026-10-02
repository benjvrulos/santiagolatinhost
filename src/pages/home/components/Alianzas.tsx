import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Alianzas() {
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
    <section id="alianzas" ref={sectionRef} className="bg-white py-16 md:py-24 lg:py-32">
      <div className="section-padding">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-accent text-sm font-medium tracking-[0.15em] uppercase mb-4">
            {t('partners_title')}
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary font-bold mb-6 md:mb-8 leading-tight">
            {t('partners_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {t('partners_text')}
          </p>
        </div>

        {/* Partner categories visual */}
        <div className={`mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: 'ri-building-4-line', label: 'Dance Schools' },
            { icon: 'ri-hotel-line', label: 'Hostels & Hotels' },
            { icon: 'ri-earth-line', label: 'Int. Communities' },
            { icon: 'ri-hand-heart-line', label: 'Cultural Spaces' },
            { icon: 'ri-graduation-cap-line', label: 'Universities' },
          ].map((item, i) => (
            <div
              key={item.label}
              className="bg-surface rounded-xl p-5 md:p-6 text-center hover:bg-surface-dark transition-colors"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-primary/5">
                <i className={`${item.icon} text-2xl text-accent`} />
              </div>
              <p className="text-primary text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
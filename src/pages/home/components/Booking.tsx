import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Booking() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    fetch('https://readdy.ai/api/form/d810p79otaqgf4pfet20', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        form.reset();
      })
      .catch(() => {
        setSubmitted(true);
        setLoading(false);
      });
  };

  if (submitted) {
    return (
      <section id="reserva" ref={sectionRef} className="bg-primary py-16 md:py-24 lg:py-32">
        <div className="section-padding">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
              <i className="ri-check-line text-3xl text-accent" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-4">
              {t('booking_success')}
            </h3>
            <p className="text-white/60 text-base">We will contact you very soon to confirm your experience.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors"
            >
              Book another experience
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserva" ref={sectionRef} className="bg-primary py-16 md:py-24 lg:py-32">
      <div className="section-padding">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-accent text-sm font-medium tracking-[0.15em] uppercase mb-4">
            {t('booking_title')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4">
            {t('booking_title')}
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            {t('booking_subtitle')}
          </p>
        </div>

        {/* Form */}
        <div className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <form
            onSubmit={handleSubmit}
            data-readdy-form
            className="bg-primary-light/40 rounded-2xl p-6 md:p-8 lg:p-10 border border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_name')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Jane Doe"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_country')}
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="United States"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_language')}
                </label>
                <select
                  name="language"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">{t('booking_language')}</option>
                  <option value="English">{t('booking_language_en')}</option>
                  <option value="Spanish">{t('booking_language_es')}</option>
                  <option value="Both">{t('booking_language_both')}</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_email')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_whatsapp')}
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="+1 555 123 4567"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_date')}
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Number of people */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_people')}
                </label>
                <input
                  type="number"
                  name="people"
                  min="1"
                  max="20"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="2"
                />
              </div>

              {/* Dance Level */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_level')}
                </label>
                <select
                  name="dance_level"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">{t('booking_level')}</option>
                  <option value="Beginner">{t('booking_level_beginner')}</option>
                  <option value="Intermediate">{t('booking_level_intermediate')}</option>
                  <option value="Advanced">{t('booking_level_advanced')}</option>
                </select>
              </div>

              {/* Experience */}
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_experience')}
                </label>
                <select
                  name="experience"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">{t('booking_experience')}</option>
                  <option value="Historic Walk + Dance Class">{t('booking_exp1')}</option>
                  <option value="Santiago Latin Night">{t('booking_exp2')}</option>
                  <option value="Social Dance for Foreigners">{t('booking_exp3')}</option>
                  <option value="Private Latin Experience">{t('booking_exp4')}</option>
                  <option value="Latin Night Premium">{t('booking_exp5')}</option>
                  <option value="Private Latin Experience Premium">{t('booking_exp6')}</option>
                  <option value="Custom Experience">{t('booking_exp_custom')}</option>
                </select>
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('booking_notes')}
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder={t('booking_notes_placeholder')}
                />
                <p className="text-white/30 text-xs mt-1">Max 500 characters</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full md:w-auto md:min-w-[280px] mx-auto flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>{t('booking_submit')}</span>
                  <i className="ri-arrow-right-line" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

export default function Partners() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.1);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const benefits = [
    { icon: 'ri-earth-line', key: 'partners_benefit1' },
    { icon: 'ri-secure-payment-line', key: 'partners_benefit2' },
    { icon: 'ri-megaphone-line', key: 'partners_benefit3' },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = (formData.get('website_alt') as string | null)?.trim() ?? '';
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const payload = new URLSearchParams();
    formData.forEach((value, key) => {
      if (key === 'website_alt') return;
      payload.append(key, value.toString());
    });

    setLoading(true);
    try {
      const response = await fetch('https://readdy.ai/api/form/db1sq0b2asjjtt1slajg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      const responseText = await response.text();
      let parsed: { code?: string; meta?: { message?: string; detail?: string } } | null = null;
      try {
        parsed = responseText ? JSON.parse(responseText) : null;
      } catch {
        parsed = null;
      }

      const serverMsg = parsed?.meta?.message || parsed?.meta?.detail || responseText || '';
      const isSpam = /spam/i.test(serverMsg);
      const isOk = response.ok && parsed?.code === 'OK';

      if (isOk && !isSpam) {
        setSubmitted(true);
        form.reset();
      } else {
        setFormError(serverMsg || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="partners" ref={ref} className="bg-white py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              {t('partners_label')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6 leading-tight">
              {t('partners_title')}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              {t('partners_text')}
            </p>

            <div className="relative rounded-2xl overflow-hidden h-48 md:h-56 mb-8">
              <img
                src="https://readdy.ai/api/search-image?query=Interior%20of%20a%20welcoming%20local%20dance%20school%20in%20Santiago%20Chile%20with%20wooden%20floor%20and%20mirrors%2C%20small%20group%20of%20students%20and%20instructor%2C%20warm%20natural%20light%2C%20authentic%20documentary%20photography&width=1200&height=700&seq=slh-partners&orientation=landscape"
                alt={t('partners_title')}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit.key} className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                    <i className={`${benefit.icon} text-accent`} />
                  </div>
                  <span className="text-primary text-sm md:text-base font-medium">{t(benefit.key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-1000 delay-150 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-surface rounded-2xl p-6 md:p-8 border border-gray-100">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <i className="ri-check-line text-3xl text-accent" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-primary font-bold mb-3">
                    {t('partner_form_title')}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {t('partner_form_success')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-readdy-form>
                  <h3 className="font-display text-xl md:text-2xl text-primary font-bold mb-2">
                    {t('partner_form_title')}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">{t('partner_form_subtitle')}</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-primary text-sm font-medium mb-2">
                        {t('partner_form_business')}
                      </label>
                      <input
                        type="text"
                        name="business"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                        placeholder="Tierra Dura Studio"
                      />
                    </div>

                    <div>
                      <label className="block text-primary text-sm font-medium mb-2">
                        {t('partner_form_type')}
                      </label>
                      <select
                        name="provider_type"
                        required
                        defaultValue=""
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                      >
                        <option value="" disabled>{t('partner_form_type')}</option>
                        <option value="Dance school">{t('partner_form_type_school')}</option>
                        <option value="Cultural space">{t('partner_form_type_space')}</option>
                        <option value="Event producer">{t('partner_form_type_events')}</option>
                        <option value="Other">{t('partner_form_type_other')}</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-primary text-sm font-medium mb-2">
                          {t('partner_form_contact')}
                        </label>
                        <input
                          type="text"
                          name="contact_name"
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-primary text-sm font-medium mb-2">
                          {t('partner_form_city')}
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                          placeholder="Santiago"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-primary text-sm font-medium mb-2">
                          {t('partner_form_email')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                          placeholder="jane@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-primary text-sm font-medium mb-2">
                          {t('partner_form_whatsapp')}
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                          placeholder="+56 9 1234 5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-primary text-sm font-medium mb-2">
                        {t('partner_form_message')}
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        maxLength={500}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder={t('partner_form_message_placeholder')}
                      />
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website_alt"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      readOnly
                      className="contact-extra"
                    />

                    {formError && (
                      <p className="text-accent text-sm font-medium">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors disabled:opacity-60 whitespace-nowrap"
                    >
                      {loading ? (
                        <>
                          <i className="ri-loader-4-line animate-spin" />
                          <span>{t('partner_form_submit')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('partner_form_submit')}</span>
                          <i className="ri-arrow-right-line" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
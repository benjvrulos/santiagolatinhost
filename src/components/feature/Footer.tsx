import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: t('nav_inicio'), href: '#inicio' },
    { label: t('nav_ai'), href: '#ai-planner' },
    { label: t('nav_tonight'), href: '#tonight' },
    { label: t('nav_experiences'), href: '#experiences' },
    { label: t('nav_how'), href: '#como-funciona' },
    { label: t('nav_book'), href: '#reserva' },
  ];

  const destinations = [
    t('loc_santiago'),
    t('loc_patagonia'),
    t('loc_atacama'),
    t('loc_valparaiso'),
    t('loc_colchagua'),
    t('loc_chiloe'),
    t('loc_rapa_nui'),
    t('loc_elqui'),
  ];

  const socialLinks = [
    { icon: 'ri-instagram-line', label: 'Instagram', href: 'https://www.instagram.com/chilelatinhost/' },
    { icon: 'ri-youtube-line', label: 'YouTube', href: 'https://youtube.com' },
    { icon: 'ri-whatsapp-line', label: 'WhatsApp', href: 'https://wa.me/56923895542' },
  ];

  return (
    <footer id="contacto" className="bg-primary-dark py-14 md:py-20">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 md:mb-16">
            {/* Brand */}
            <div className="lg:col-span-3">
              <img
                src="https://public.readdy.ai/ai/img_res/4d35a958-b91c-458f-a0af-e97c6f215621.png"
                alt="Chile Latin Host logo"
                title="Chile Latin Host logo"
                className="h-24 md:h-32 w-auto object-contain mb-5"
              />
              <p className="text-white/75 text-sm leading-relaxed max-w-xs">
                {t('footer_tagline')}
              </p>
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 text-white/80 hover:bg-white hover:text-primary-dark hover:border-white transition-colors"
                  >
                    <i className={`${social.icon} text-base`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div className="lg:col-span-4">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {t('footer_destinations')}
              </h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {destinations.map((name) => (
                  <li key={name} className="min-w-0">
                    <a
                      href="#experiences"
                      onClick={(e) => { e.preventDefault(); scrollTo('#experiences'); }}
                      className="block text-white/70 text-sm leading-snug hover:text-white transition-colors cursor-pointer break-words"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {t('footer_links')}
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-white/70 text-sm hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3 lg:pl-2">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {t('footer_contact')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:chilelatinhost@gmail.com"
                    className="text-white/70 text-sm hover:text-white transition-colors inline-flex items-center gap-2 break-all"
                  >
                    <i className="ri-mail-line text-base shrink-0" />
                    chilelatinhost@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/56923895542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 text-sm hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <i className="ri-whatsapp-line text-base shrink-0" />
                    +569 2389 5542
                  </a>
                </li>
                <li className="text-white/70 text-sm inline-flex items-center gap-2">
                  <i className="ri-map-pin-line text-base shrink-0" />
                  {t('footer_address')}
                </li>
                <li className="text-white/60 text-xs leading-relaxed pt-1">
                  {t('footer_hours')}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-xs text-center sm:text-left">
              {new Date().getFullYear()} {t('footer_brand')}. {t('footer_copyright')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/50 text-xs">ES</span>
              <span className="text-white/50 text-xs">EN</span>
              <span className="text-white/50 text-xs">中文</span>
              <span className="text-white/50 text-xs">PT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
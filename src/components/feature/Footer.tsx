import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark py-14 md:py-20">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12 md:mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://static.readdy.ai/image/2d21e4e330632c8a528b9c2920a5df7e/689ee08902c28f0d96d4ae04dd23bfa2.jpeg"
                  alt="Santiago Latin Host"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-display text-white font-bold text-lg">Santiago Latin Host</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                {t('footer_tagline')}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t('footer_links')}</h4>
              <ul className="space-y-2.5">
                {[
                  { label: t('nav_inicio'), href: '#inicio' },
                  { label: t('nav_experiencias'), href: '#experiencias' },
                  { label: t('nav_seguridad'), href: '#seguridad' },
                  { label: t('nav_como_funciona'), href: '#como-funciona' },
                  { label: t('nav_reserva'), href: '#reserva' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-white/50 text-sm hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t('footer_social')}</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://www.instagram.com/santiagolatinhost/" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2">
                    <i className="ri-instagram-line" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2">
                    <i className="ri-youtube-line" />
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/56923895542" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2">
                    <i className="ri-whatsapp-line" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t('footer_contact')}</h4>
              <ul className="space-y-2.5">
                <li className="text-white/50 text-sm">{t('footer_email')}</li>
                <li className="text-white/50 text-sm">{t('footer_phone')}</li>
                <li className="text-white/50 text-sm pt-2">Santiago, Chile</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              {new Date().getFullYear()} Santiago Latin Host. {t('footer_copyright')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/20 text-xs">ES</span>
              <span className="text-white/20 text-xs">EN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
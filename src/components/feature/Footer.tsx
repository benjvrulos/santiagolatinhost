import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { label: t("nav_inicio"), href: "#inicio" },
    { label: t("nav_tonight"), href: "#tonight" },
    { label: t("nav_experiences"), href: "#experiences" },
    { label: t("nav_how"), href: "#como-funciona" },
    { label: t("nav_partners"), href: "#partners" },
    { label: t("nav_book"), href: "#reserva" },
  ];

  return (
    <footer id="contacto" className="bg-primary-dark py-14 md:py-20">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12 md:mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img
                src="https://public.readdy.ai/ai/img_res/40542972-0570-4301-8277-5cd7bbb67ee9.png"
                alt="Santiago Latin Host logo"
                title="Santiago Latin Host logo"
                className="h-20 md:h-24 w-auto object-contain mb-5"
              />
              <p className="text-white/50 text-sm leading-relaxed">
                {t("footer_tagline")}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {t("footer_links")}
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
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
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {t("footer_social")}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://www.instagram.com/santiagolatinhost/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    <i className="ri-instagram-line" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    <i className="ri-youtube-line" />
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/56923895542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    <i className="ri-whatsapp-line" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {t("footer_contact")}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="mailto:chilelatinhost@gmail.com"
                    className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    <i className="ri-mail-line text-base" />
                    chilelatinhost@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/56923895542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-sm hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    <i className="ri-whatsapp-line text-base" />
                    +569 2389 5542
                  </a>
                </li>
                <li className="text-white/50 text-sm inline-flex items-center gap-2 pt-2">
                  <i className="ri-map-pin-line text-base" />
                  {t("footer_address")}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              {new Date().getFullYear()} {t("footer_brand")}.{" "}
              {t("footer_copyright")}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/20 text-xs">ES</span>
              <span className="text-white/20 text-xs">EN</span>
              <span className="text-white/20 text-xs">中文</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

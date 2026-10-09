import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const navItems = [
    { label: t("nav_inicio"), href: "#inicio" },
    { label: t("nav_tonight"), href: "#tonight" },
    { label: t("nav_experiences"), href: "#experiences" },
    { label: t("nav_how"), href: "#como-funciona" },
    { label: t("nav_partners"), href: "#partners" },
    { label: t("nav_book"), href: "#reserva" },
  ];

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = (hash?: string) => {
    setMobileOpen(false);
    window.REACT_APP_NAVIGATE?.("/" + (hash || ""));
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-primary/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className="flex items-center flex-shrink-0"
          >
            <img
              src="https://public.readdy.ai/ai/img_res/40542972-0570-4301-8277-5cd7bbb67ee9.png"
              alt="Santiago Latin Host"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={isHome ? item.href : "/"}
                onClick={(e) => {
                  e.preventDefault();
                  if (isHome) scrollTo(item.href);
                  else goHome(item.href);
                }}
                className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-accent ${
                  scrolled ? "text-white/85" : "text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md border transition-all whitespace-nowrap ${
                scrolled
                  ? "border-white/25 text-white hover:border-accent hover:text-accent"
                  : "border-white/30 text-white hover:border-accent hover:text-accent"
              }`}
            >
              {i18n.language === "es" ? "EN" : "ES"}
            </button>
            <a
              href={isHome ? "#reserva" : "/"}
              onClick={(e) => {
                e.preventDefault();
                if (isHome) scrollTo("#reserva");
                else goHome("#reserva");
              }}
              className="hidden md:inline-flex whitespace-nowrap text-sm font-semibold px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors"
            >
              {t("nav_cta")}
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md transition-colors text-white"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-full transition-all bg-white ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block h-0.5 w-full transition-all bg-white ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-full transition-all bg-white ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <div className="bg-primary/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={isHome ? item.href : "/"}
              onClick={(e) => {
                e.preventDefault();
                if (isHome) scrollTo(item.href);
                else goHome(item.href);
              }}
              className="block py-3 px-4 text-sm font-medium text-white/90 hover:text-accent rounded-lg hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={isHome ? "#reserva" : "/"}
            onClick={(e) => {
              e.preventDefault();
              if (isHome) scrollTo("#reserva");
              else goHome("#reserva");
            }}
            className="block mt-2 py-3 px-4 text-sm font-semibold text-center rounded-full bg-accent text-white hover:bg-accent-dark transition-colors"
          >
            {t("nav_cta")}
          </a>
        </div>
      </div>
    </nav>
  );
}

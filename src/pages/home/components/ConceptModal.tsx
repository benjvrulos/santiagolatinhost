import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface ConceptCategory {
  id: string;
  img: string;
  badgeKey: string;
  titleKey: string;
  descKey: string;
  conceptKey: string;
  highlightKeys: string[];
}

interface ConceptModalProps {
  category: ConceptCategory | null;
  onClose: () => void;
}

export default function ConceptModal({ category, onClose }: ConceptModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!category) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [category, onClose]);

  if (!category) return null;

  const scrollToBooking = () => {
    onClose();
    const el = document.querySelector("#reserva");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Cover */}
        <div className="relative h-52 md:h-60">
          <img
            src={category.img}
            alt={t(category.titleKey)}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <span className="absolute top-4 left-4 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            {t(category.badgeKey)}
          </span>
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-accent text-white text-[11px] md:text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            <i className="ri-time-line text-xs" />
            {t("choose_soon")}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("choose_preview_close")}
            className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 text-primary flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg" />
          </button>
          <div className="absolute bottom-4 left-5 right-16">
            <span className="block text-warm-light text-xs font-semibold tracking-[0.2em] uppercase mb-1">
              {t("choose_preview_label")}
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-white font-bold leading-tight">
              {t(category.titleKey)}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-7">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
            {t(category.conceptKey)}
          </p>

          <ul className="space-y-2.5 mb-6">
            {category.highlightKeys.map((key) => (
              <li
                key={key}
                className="flex items-start gap-2.5 text-primary text-sm"
              >
                <i className="ri-check-line text-accent mt-0.5" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-start gap-2.5 bg-surface rounded-xl p-4 mb-6">
            <i className="ri-information-line text-accent text-lg mt-0.5" />
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {t("choose_preview_note")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={scrollToBooking}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-notification-3-line" />
              {t("choose_preview_cta")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-6 py-3 border border-primary/15 text-primary font-semibold rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
            >
              {t("choose_preview_close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

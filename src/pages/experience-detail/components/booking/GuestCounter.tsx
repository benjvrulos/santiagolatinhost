import { useTranslation } from "react-i18next";

interface GuestCounterProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export default function GuestCounter({
  value,
  min,
  max,
  onChange,
}: GuestCounterProps) {
  const { t } = useTranslation();
  const clamp = (next: number) => Math.min(Math.max(next, min), max);

  return (
    <div>
      <label className="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
        {t("exp_booking_people")}
      </label>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-surface/70 px-3 py-2">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          aria-label={t("exp_booking_decrease")}
          className="w-9 h-9 flex items-center justify-center rounded-md text-primary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <i className="ri-subtract-line" />
        </button>
        <span className="text-primary font-semibold text-base tabular-nums min-w-[2ch] text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          aria-label={t("exp_booking_increase")}
          className="w-9 h-9 flex items-center justify-center rounded-md text-primary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <i className="ri-add-line" />
        </button>
      </div>
      <p className="text-gray-400 text-xs mt-1">
        {t("exp_booking_up_to", { max })}
      </p>
      <input type="hidden" name="peopleCount" value={value} />
    </div>
  );
}

import { useTranslation } from "react-i18next";

interface OrderSummaryProps {
  experienceName: string;
  dateLabel: string;
  timeLabel: string;
  guests: number;
  pricePerPerson?: number;
  currency: string;
}

function currencySymbol(currency: string): string {
  return currency === "USD" ? "US$" : currency;
}

export default function OrderSummary({
  experienceName,
  dateLabel,
  timeLabel,
  guests,
  pricePerPerson,
  currency,
}: OrderSummaryProps) {
  const { t } = useTranslation();
  const hasPrice = typeof pricePerPerson === "number" && pricePerPerson > 0;
  const total = hasPrice ? (pricePerPerson as number) * guests : 0;
  const money = (amount: number) => `${currencySymbol(currency)}${amount}`;

  const rows = [
    { label: t("ck_date"), value: dateLabel || "—" },
    { label: t("ck_time"), value: timeLabel || "—" },
    { label: t("ck_guests"), value: String(guests) },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-receipt-line text-accent text-lg" />
        <h2 className="font-display text-lg text-primary font-bold">
          {t("ck_summary_label")}
        </h2>
      </div>

      <p className="font-display text-base text-primary font-bold leading-snug mb-4">
        {experienceName || "—"}
      </p>

      <dl className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 text-sm"
          >
            <dt className="text-gray-500 whitespace-nowrap">{row.label}</dt>
            <dd className="text-primary font-medium text-right">{row.value}</dd>
          </div>
        ))}
        {hasPrice && (
          <div className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-gray-500 whitespace-nowrap">
              {t("ck_price_per_person")}
            </dt>
            <dd className="text-primary font-medium text-right">
              {money(pricePerPerson as number)}
            </dd>
          </div>
        )}
      </dl>

      {hasPrice && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-primary text-sm font-semibold">
            {t("ck_total")}
          </span>
          <span className="font-display text-2xl text-primary font-bold">
            {money(total)}
          </span>
        </div>
      )}
    </div>
  );
}

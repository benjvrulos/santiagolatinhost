interface BookingSummaryProps {
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

export default function BookingSummary({
  experienceName,
  dateLabel,
  timeLabel,
  guests,
  pricePerPerson,
  currency,
}: BookingSummaryProps) {
  const hasPrice = typeof pricePerPerson === "number" && pricePerPerson > 0;
  const total = hasPrice ? (pricePerPerson as number) * guests : 0;
  const money = (amount: number) => `${currencySymbol(currency)}${amount}`;

  const rows = [
    { label: "Experience", value: experienceName || "—" },
    { label: "Date", value: dateLabel || "—" },
    { label: "Time", value: timeLabel || "—" },
    { label: "Guests", value: String(guests) },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-surface/70 p-4 md:p-5">
      <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
        Booking summary
      </p>

      <dl className="space-y-2">
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
              Price per person
            </dt>
            <dd className="text-primary font-medium text-right">
              {money(pricePerPerson as number)}
            </dd>
          </div>
        )}
      </dl>

      {hasPrice ? (
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-primary text-sm font-semibold">Total</span>
          <span className="font-display text-xl text-primary font-bold">
            {money(total)}
          </span>
        </div>
      ) : (
        <p className="mt-3 pt-3 border-t border-gray-200 text-gray-500 text-xs leading-relaxed">
          Final price will be confirmed by our team.
        </p>
      )}
    </div>
  );
}

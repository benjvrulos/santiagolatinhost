import { useTranslation } from "react-i18next";

interface BookingDetailsCardProps {
  img: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  timeLabel: string;
  guests: number;
  meetingPoint: string;
}

export default function BookingDetailsCard({
  img,
  title,
  subtitle,
  dateLabel,
  timeLabel,
  guests,
  meetingPoint,
}: BookingDetailsCardProps) {
  const { t } = useTranslation();

  const rows = [
    { icon: "ri-calendar-line", label: t("ck_date"), value: dateLabel },
    { icon: "ri-time-line", label: t("ck_time"), value: timeLabel },
    {
      icon: "ri-global-line",
      label: t("ck_timezone"),
      value: "Santiago, Chile (GMT-3)",
    },
    { icon: "ri-group-line", label: t("ck_guests"), value: String(guests) },
    {
      icon: "ri-map-pin-line",
      label: t("ck_meeting_point"),
      value: meetingPoint,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-file-list-3-line text-accent text-lg" />
        <h2 className="font-display text-lg text-primary font-bold">
          {t("ck_details_label")}
        </h2>
      </div>

      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
          {img ? (
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <i className="ri-image-line text-xl" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-base md:text-lg text-primary font-bold leading-snug">
            {title}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
              <i className={`${row.icon} text-accent text-sm`} />
            </div>
            <div className="min-w-0">
              <dt className="text-gray-400 text-xs uppercase tracking-wider">
                {row.label}
              </dt>
              <dd className="text-primary text-sm font-medium mt-0.5">
                {row.value || "—"}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

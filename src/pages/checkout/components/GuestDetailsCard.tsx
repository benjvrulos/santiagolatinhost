import { useTranslation } from "react-i18next";

interface GuestDetailsCardProps {
  name: string;
  email: string;
  phone: string;
  requests: string;
}

export default function GuestDetailsCard({
  name,
  email,
  phone,
  requests,
}: GuestDetailsCardProps) {
  const { t } = useTranslation();

  const rows = [
    { icon: "ri-user-line", label: t("ck_name"), value: name },
    { icon: "ri-mail-line", label: t("ck_email"), value: email },
    { icon: "ri-whatsapp-line", label: t("ck_phone"), value: phone },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-user-3-line text-accent text-lg" />
        <h2 className="font-display text-lg text-primary font-bold">
          {t("ck_guest_label")}
        </h2>
      </div>

      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-md bg-surface">
              <i className={`${row.icon} text-primary text-sm`} />
            </div>
            <div className="min-w-0">
              <dt className="text-gray-400 text-xs uppercase tracking-wider">
                {row.label}
              </dt>
              <dd className="text-primary text-sm font-medium mt-0.5 break-words">
                {row.value || "—"}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-5 pt-5 border-t border-gray-100">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
          {t("ck_requests")}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {requests ? requests : t("ck_no_requests")}
        </p>
      </div>
    </div>
  );
}

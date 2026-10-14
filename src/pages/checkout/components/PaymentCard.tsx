import { useTranslation } from "react-i18next";

interface PaymentCardProps {
  brand: string;
  last4: string;
  transactionId: string;
  amountLabel: string;
  paidAt: string;
}

const PAID_FMT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Santiago",
});

export default function PaymentCard({
  brand,
  last4,
  transactionId,
  amountLabel,
  paidAt,
}: PaymentCardProps) {
  const { t } = useTranslation();
  const paidDate = paidAt ? PAID_FMT.format(new Date(paidAt)) : "—";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <i className="ri-secure-payment-line text-accent text-lg" />
          <h2 className="font-display text-lg text-primary font-bold">
            {t("ck_payment_label")}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 whitespace-nowrap">
          <i className="ri-check-line" />
          {t("ck_paid")}
        </span>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl bg-surface/70 border border-gray-100">
        <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-md bg-white border border-gray-200">
          <i className="ri-bank-card-2-line text-primary text-lg" />
        </div>
        <div className="min-w-0">
          <p className="text-primary text-sm font-semibold">
            {brand} •••• {last4}
          </p>
          <p className="text-gray-500 text-xs">{t("ck_payment_method")}</p>
        </div>
        <span className="ml-auto font-display text-lg text-primary font-bold whitespace-nowrap">
          {amountLabel}
        </span>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-gray-500 whitespace-nowrap">{t("ck_status")}</dt>
          <dd className="text-emerald-700 font-medium">{t("ck_paid")}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-gray-500 whitespace-nowrap">{t("ck_paid_on")}</dt>
          <dd className="text-primary font-medium text-right">{paidDate}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-gray-500 whitespace-nowrap">
            {t("ck_transaction")}
          </dt>
          <dd className="text-primary font-medium text-right break-all">
            {transactionId}
          </dd>
        </div>
      </dl>
    </div>
  );
}

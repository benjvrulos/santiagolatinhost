import { useTranslation } from "react-i18next";

export default function NextSteps() {
  const { t } = useTranslation();

  const steps = [t("ck_step1"), t("ck_step2"), t("ck_step3")];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-guide-line text-accent text-lg" />
        <h2 className="font-display text-lg text-primary font-bold">
          {t("ck_next_steps")}
        </h2>
      </div>

      <ol className="space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-full bg-accent/10 text-accent text-xs font-bold">
              {i + 1}
            </span>
            <p className="text-gray-600 text-sm leading-relaxed pt-0.5">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

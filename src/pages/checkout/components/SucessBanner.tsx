interface SuccessBannerProps {
  title: string;
  subtitle: string;
  referenceLabel: string;
  reference: string;
}

export default function SuccessBanner({
  title,
  subtitle,
  referenceLabel,
  reference,
}: SuccessBannerProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5">
        <i className="ri-check-line text-emerald-600 text-3xl md:text-4xl" />
      </div>
      <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-3 leading-tight">
        {title}
      </h1>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
        {subtitle}
      </p>
      <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full px-4 py-2">
        <i className="ri-hashtag text-accent" />
        {referenceLabel}:
        <span className="text-primary tracking-wide">{reference}</span>
      </span>
    </div>
  );
}

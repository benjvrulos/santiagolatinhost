interface ExperienceCardProps {
  img: string;
  title: string;
  subtitle: string;
}

export default function ExperienceCard({
  img,
  title,
  subtitle,
}: ExperienceCardProps) {
  return (
    <div className="mb-6">
      <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
        Your experience
      </p>
      <div className="flex items-center gap-4">
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
          <h3 className="font-display text-base md:text-lg text-primary font-bold leading-snug truncate">
            {title}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

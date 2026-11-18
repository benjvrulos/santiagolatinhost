import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';

export default function Founder() {
  const { t } = useTranslation();
  const { ref, visible } = useInView(0.12);

  const roles = ['founder_role1', 'founder_role2', 'founder_role3', 'founder_role4'];

  return (
    <section id="founder" ref={ref} className="bg-surface py-20 md:py-28 lg:py-32">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div className={`lg:col-span-2 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              <img
                src="https://readdy.ai/api/search-image?query=Friendly%20professional%20portrait%20of%20a%20young%20Chilean%20man%20in%20smart%20casual%20clothing%20with%20arms%20crossed%2C%20warm%20soft%20studio%20lighting%2C%20neutral%20cream%20background%2C%20confident%20approachable%20expression%2C%20editorial%20founder%20portrait%20photography&width=800&height=1000&seq=slh-founder&orientation=portrait"
                alt={t('founder_name')}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-150 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              {t('founder_label')}
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary font-bold mb-6 leading-tight">
              {t('founder_title')}
            </h2>
            <p className="font-display text-2xl md:text-3xl text-primary font-bold mb-4">
              {t('founder_name')}
            </p>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {roles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-100 rounded-full text-primary text-xs md:text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {t(role)}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-base md:text-lg font-medium">
              {t('founder_position')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
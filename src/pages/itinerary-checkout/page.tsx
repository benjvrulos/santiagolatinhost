import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import DayItinerary from '@/pages/itinerary-checkout/components/DayItinerary';
import ReviewSummary from '@/pages/itinerary-checkout/components/ReviewSummary';
import {
  loadItineraryOrder,
  saveItineraryOrder,
  type ItineraryOrder,
} from '@/lib/itinerary';

export default function ItineraryCheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<ItineraryOrder | null>(() => loadItineraryOrder());

  const handleDatesChange = (startDate: string, endDate: string) => {
    setOrder((prev) => {
      if (!prev) return prev;
      const next: ItineraryOrder = { ...prev, startDate, endDate };
      saveItineraryOrder(next);
      return next;
    });
  };

  const handleContinue = () => {
    navigate('/itinerario/pago');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16 md:pt-20">
        <section className="section-padding pt-10 md:pt-14 pb-8 md:pb-10">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-accent text-sm mb-6 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line" />
              {t('it_purchase_back')}
            </button>

            <p className="text-accent text-xs md:text-sm font-medium tracking-[0.15em] uppercase mb-3">
              {t('it_purchase_label')}
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold leading-tight mb-3">
              {t('it_purchase_title')}
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
              {t('it_purchase_subtitle')}
            </p>
          </div>
        </section>

        <section className="section-padding pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            {order ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                  <DayItinerary order={order} />
                </div>
                <div className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24">
                    <ReviewSummary
                      order={order}
                      onContinue={handleContinue}
                      onBack={handleBack}
                      onDatesChange={handleDatesChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-lg mx-auto text-center bg-white rounded-2xl border border-gray-100 p-8 md:p-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <i className="ri-route-line text-2xl text-accent" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-3">
                  {t('it_purchase_empty_title')}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {t('it_purchase_empty_text')}
                </p>
                <button
                  onClick={handleBack}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-sparkling-2-line" />
                  {t('it_purchase_empty_cta')}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
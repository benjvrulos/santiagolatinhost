import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useNavigationType,
} from "react-router-dom";
import ExperienceHero from "./components/ExperienceHero";
import ExperienceMainContent from "./components/ExperienceMainContent";
import ExperienceSideBar from "./components/ExperienceSideBar";
import BookingForm from "./components/BookingForm";
import PendingBookingCard from "./components/PendingBookingCard";
import { useExperienceBySlug } from "@/hooks/useExperiences";
import { useCreateStripeCheckout } from "@/hooks/useCreateStripeCheckout";
import { usePendingBooking } from "@/hooks/usePendingBooking";

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [searchParams] = useSearchParams();
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  const [isEditingBooking, setIsEditingBooking] = useState(false);

  const editBookingFromCheckout = searchParams.get("editBooking") === "true";

  const language = i18n.resolvedLanguage ?? i18n.language;

  const { data: exp, isLoading, isError } = useExperienceBySlug(slug ?? "");

  const createStripeCheckoutMutation = useCreateStripeCheckout();

  const schedule = exp?.schedules?.[0] ?? null;

  const { pendingBooking, isPendingBookingLoading, hasValidPendingBooking } =
    usePendingBooking(schedule?.id);

  const showPendingCard =
    !!pendingBooking &&
    hasValidPendingBooking &&
    !isEditingBooking &&
    !editBookingFromCheckout;

  const showEditForm =
    !!pendingBooking &&
    hasValidPendingBooking &&
    (isEditingBooking || editBookingFromCheckout);

  const handleContinuePayment = async () => {
    if (!pendingBooking) {
      return;
    }

    try {
      const checkout = await createStripeCheckoutMutation.mutateAsync(
        pendingBooking.id,
      );

      if (!checkout.checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned");
      }

      window.location.href = checkout.checkoutUrl;
    } catch (error) {
      console.error("Unable to continue payment:", error);
    }
  };

  useEffect(() => {
    if (!exp?.id || editBookingFromCheckout) {
      return;
    }

    if (navigationType === "PUSH") {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [exp?.id, navigationType, editBookingFromCheckout]);

  /*
   * 2. Viene desde Checkout para modificar
   *    -> ir directo a reserva.
   */
  useEffect(() => {
    if (!editBookingFromCheckout || !showEditForm) {
      return;
    }

    const timeout = window.setTimeout(() => {
      document.getElementById("reserva")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [editBookingFromCheckout, showEditForm]);

  useEffect(() => {
    if (!exp) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [exp]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-500 text-sm">
            {t("exp_loading", {
              defaultValue: "Cargando experiencia...",
            })}
          </p>
        </div>
      </div>
    );
  }

  if (isError || !exp || !slug) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-primary mb-4">
            {t("exp_not_found", {
              defaultValue: "Experiencia no encontrada",
            })}
          </h1>

          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            {t("exp_back_to_list", {
              defaultValue: "Volver",
            })}
          </button>
        </div>
      </div>
    );
  }

  const isResolvingPendingBooking = isPendingBookingLoading;

  return (
    <>
      {/* HERO */}
      <ExperienceHero experience={exp} onBack={() => navigate("/")} />

      {/* CONTENT */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* MAIN */}

            <ExperienceMainContent
              experience={exp}
              schedule={schedule}
              language={language}
              visibleSections={visibleSections}
            />

            {/* SIDEBAR */}
            <ExperienceSideBar
              experience={exp}
              schedule={schedule}
              language={language}
            />
          </div>
        </div>
      </div>
      {/* Booking form or Pending Form */}
      {isResolvingPendingBooking ? (
        <section
          id="reserva"
          className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 md:pb-24"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />

              <p className="text-sm text-gray-500">
                {t("pending_booking_checking", {
                  defaultValue: "Checking your booking...",
                })}
              </p>
            </div>
          </div>
        </section>
      ) : showPendingCard ? (
        <PendingBookingCard
          bookingId={pendingBooking.id}
          expiresAt={pendingBooking.expiresAt!}
          onContinuePayment={handleContinuePayment}
          onEditBooking={() => setIsEditingBooking(true)}
          isLoading={createStripeCheckoutMutation.isPending}
        />
      ) : (
        <BookingForm
          key={showEditForm ? `edit-${pendingBooking?.id}` : "new-booking"}
          exp={exp}
          booking={showEditForm ? pendingBooking : undefined}
          mode={showEditForm ? "edit" : "create"}
          onCancelEdit={() => setIsEditingBooking(false)}
        />
      )}
    </>
  );
}

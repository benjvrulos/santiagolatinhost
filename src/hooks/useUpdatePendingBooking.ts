import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UpdatePendingBookingPayload } from "@/types/booking.interface";

import { updatePendingBooking } from "@/services/booking.api";

export function useUpdatePendingBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: number;
      payload: UpdatePendingBookingPayload;
    }) => updatePendingBooking(bookingId, payload),

    onSuccess: async (_updatedBooking, variables) => {
      /*
       * No hacemos setQueryData con la
       * respuesta parcial del PATCH,
       * porque puede venir sin schedule.
       *
       * Pedimos nuevamente el BookingDetail
       * completo al backend.
       */
      await queryClient.invalidateQueries({
        queryKey: ["booking", variables.bookingId],
      });

      /*
       * También refrescamos experiencia
       * para actualizar availableSpots.
       */
      await queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },
  });
}

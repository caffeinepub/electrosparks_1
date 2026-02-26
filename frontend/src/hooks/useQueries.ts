import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { EventType } from '../backend';

export function useSubmitRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      fullName: string;
      collegeName: string;
      department: string;
      year: number;
      email: string;
      phone: string;
      eventType: EventType;
      numberOfMembers: number;
      totalAmount: number;
      paymentScreenshotFileName: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitRegistration(
        params.fullName,
        params.collegeName,
        params.department,
        BigInt(params.year),
        params.email,
        params.phone,
        params.eventType,
        BigInt(params.numberOfMembers),
        BigInt(params.totalAmount),
        params.paymentScreenshotFileName
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
    },
  });
}

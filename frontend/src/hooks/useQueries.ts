import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Registration, EventType } from '../backend';

export function useSubmitRegistration() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      collegeName: string;
      department: string;
      year: bigint;
      email: string;
      phone: string;
      eventType: EventType;
      numberOfMembers: bigint;
      totalAmount: bigint;
      paymentScreenshotFileName: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitRegistration(
        data.fullName,
        data.collegeName,
        data.department,
        data.year,
        data.email,
        data.phone,
        data.eventType,
        data.numberOfMembers,
        data.totalAmount,
        data.paymentScreenshotFileName
      );
    },
  });
}

export function useGetAllRegistrations() {
  const { actor, isFetching } = useActor();

  return useQuery<Registration[]>({
    queryKey: ['registrations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOpenRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStats() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.deleteRegistration(id);
      if (result.__kind__ === 'notFound') {
        throw new Error('Registration not found');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

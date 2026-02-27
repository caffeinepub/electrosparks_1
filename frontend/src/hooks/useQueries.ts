import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminRegistrations'] });
    },
  });
}

// Client-side credential validation — backend uses principal-based access control
// The hardcoded credentials gate the admin UI; backend calls use the actor's identity
export function useAdminLogin() {
  return useMutation({
    mutationFn: async (params: { username: string; password: string }) => {
      if (
        params.username === 'VibECX-2K26' &&
        params.password === 'VibECX@2K26'
      ) {
        // Return a client-side session token to gate the dashboard UI
        return `admin-session-${Date.now()}`;
      }
      throw new Error('Invalid Username or Password');
    },
  });
}

export function useAdminStats(isAuthenticated: boolean) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getStats();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    refetchOnMount: true,
    refetchInterval: 30000,
  });
}

export function useAllRegistrations(isAuthenticated: boolean) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['adminRegistrations'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllRegistrations();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    refetchOnMount: true,
    refetchInterval: 30000,
  });
}

import { gql } from 'graphql-request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '@/lib/graphql-client';
import type { Gimnasio, InputGimnasio } from './types';

const GIMNASIOS_QUERY = gql`
  query GetGimnasios {
    gimnasios {
      id
      nombre
      direccion
      telefono
    }
  }
`;

const UPSERT_GIMNASIO = gql`
  mutation UpsertGimnasio($id: ID, $inputGimnasio: InputGimnasio!) {
    upsertGimnasio(id: $id, inputGimnasio: $inputGimnasio) {
      id
      nombre
      direccion
      telefono
      email
    }
  }
`;

export function useGimnasios() {
  return useQuery({
    queryKey: ['gimnasios'],
    queryFn: async () => {
      const data = await gqlClient.request<{ gimnasios: Gimnasio[] }>(GIMNASIOS_QUERY);
      return data.gimnasios;
    }
  });
}

export function useUpsertGimnasio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, gimnasio }: { id: string; gimnasio: InputGimnasio }) => {
      return gqlClient.request(UPSERT_GIMNASIO, { id, inputGimnasio: gimnasio })
    },
    onSuccess: () => {
      // ✅ refetch gimnasios
      queryClient.invalidateQueries({
        queryKey: ['gimnasios']
      })
    },
  })
}
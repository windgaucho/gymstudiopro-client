import { gql } from 'graphql-request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '@/lib/graphql-client';
import type { Organizacion, InputOrganizacion } from './types';

const ORGANIZACIONES_QUERY = gql`
  query GetOrganizaciones {
    organizaciones {
      id
      tipo
      nombre
      slug
      preferencias
      direccion
      telefono
      email
    }
  }
`;

const UPSERT_ORGANIZACION = gql`
  mutation UpsertOrganizacion($id: ID, $inputOrganizacion: InputOrganizacion!) {
    upsertOrganizacion(id: $id, inputOrganizacion: $inputOrganizacion) {
      id
      tipo
      nombre
      slug
      preferencias
      direccion
      telefono
      email
    }
  }
`;

const REMOVE_ORGANIZACION = gql`
  mutation ($id: ID!) {
    removeOrganizacion(id: $id)
  }
`;

export function useOrganizaciones() {
  return useQuery({
    queryKey: ['organizaciones'],
    queryFn: async () => {
      const data = await gqlClient.request<{ organizaciones: Organizacion[] }>(ORGANIZACIONES_QUERY);
      return data.organizaciones;
    }
  });
}

export function useUpsertOrganizacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, organizacion }: { id: string; organizacion: InputOrganizacion }) => {
      return gqlClient.request(UPSERT_ORGANIZACION, { id, inputOrganizacion: organizacion })
    },
    onSuccess: () => {
      // ✅ refetch organizaciones
      queryClient.invalidateQueries({
        queryKey: ['organizaciones']
      })
    },
  })
}

export function useRemoveOrganizacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return gqlClient.request(REMOVE_ORGANIZACION, { id })
    },
    onSuccess: () => {
      // ✅ refetch organizaciones
      queryClient.invalidateQueries({
        queryKey: ['organizaciones']
      })
    },
  })
}
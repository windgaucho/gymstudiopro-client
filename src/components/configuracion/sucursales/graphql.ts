import { gql } from 'graphql-request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '@/lib/graphql-client';
import type { Sucursal, InputSucursal } from './types';

const SUCURSALES_QUERY = gql`
  query GetSucursales {
    sucursales {
      id
      nombre
      direccion
      telefono
      email
      horarioApertura
      horarioCierre
      coordenadas
      idOrganizacion
    }
  }
`;

const UPSERT_SUCURSAL = gql`
  mutation UpsertSucursal($id: ID, $inputSucursal: InputSucursal!) {
    upsertSucursal(id: $id, inputSucursal: $inputSucursal) {
      id
      nombre
      direccion
      telefono
      email
      horarioApertura
      horarioCierre
      coordenadas
      idOrganizacion
    }
  }
`;

const REMOVE_SUCURSAL = gql`
  mutation ($id: ID!) {
    removeSucursal(id: $id)
  }
`;

export function useSucursales() {
  return useQuery({
    queryKey: ['sucursales'],
    queryFn: async () => {
      const data = await gqlClient.request<{ sucursales: Sucursal[] }>(SUCURSALES_QUERY);
      return data.sucursales;
    }
  });
}

export function useUpsertSucursal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, sucursal }: { id: string; sucursal: InputSucursal }) => {
      return gqlClient.request(UPSERT_SUCURSAL, { id, inputSucursal: sucursal })
    },
    onSuccess: () => {
      // ✅ refetch sucursales
      queryClient.invalidateQueries({
        queryKey: ['sucursales']
      })
    },
  })
}

export function useRemoveSucursal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return gqlClient.request(REMOVE_SUCURSAL, { id })
    },
    onSuccess: () => {
      // ✅ refetch sucursales
      queryClient.invalidateQueries({
        queryKey: ['sucursales']
      })
    },
  })
}

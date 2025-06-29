import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from './graphql-client';

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

export function useGimnasios() {
  return useQuery({
    queryKey: ['gimnasios'],
    queryFn: async () => {
      const data = await gqlClient.request<{ gimnasios: Gimnasio[] }>(GIMNASIOS_QUERY);
      return data.gimnasios;
    }
  });
}

export type Gimnasio = {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
};
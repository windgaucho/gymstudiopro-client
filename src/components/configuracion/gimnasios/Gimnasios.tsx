// src/routes/gimnasios/component.tsx
import { useGimnasios } from '@/lib/gimnasios-graphql';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Dirección", uid: "direccion" },
  { name: "Teléfono", uid: "telefono" },
  { name: "Acciones", uid: "actions" },
];

export function GimnasiosPage() {
  const { data, isLoading, error } = useGimnasios();

  if (isLoading) return <p>⏳ Cargando gimnasios...</p>;
  if (error) return <p className="text-red-500">❌ {error.message}</p>;

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) =>
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {data?.map((row) =>
          <TableRow key={row.id}>
            {(columnKey) => <TableCell>{row[columnKey]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

import type { Key } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

interface Props<T extends { id: string | number }> {
  columns: { name: string, uid: string }[];
  data: T[];
  renderCell: (row: T, columnKey: Key) => React.ReactNode;
}

export default function Datatable<T extends { id: string | number }>({ columns, data, renderCell }: Props<T>) {
  return (
    <Table aria-label="Tabla contenido dinamico">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'Sin contenido para mostrar'} items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
// src/routes/sucursales/component.tsx
import ButtonDrawer from '@/components/drawer/ButtonDrawer';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useCallback, type Key } from 'react';

import Datatable from '@/components/datatable/Datatable';
import { DatatableActions } from '@/components/datatable/DatatableActions';
import { Button } from '@heroui/react';
import UpsertSucursal from './UpsertSucursal';
import { useSucursales, useRemoveSucursal } from './graphql';
import type { Sucursal } from './types';

const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Dirección", uid: "direccion" },
  { name: "Teléfono", uid: "telefono" },
  { name: "Email", uid: "email" },
  { name: "Horario Apertura", uid: "horarioApertura" },
  { name: "Horario Cierre", uid: "horarioCierre" },
  { name: "Acciones", uid: "actions" },
];

export function SucursalesPage() {
  const { data, isLoading, error } = useSucursales();

  const mutation = useRemoveSucursal();

  const handleEliminar = useCallback(async (id: string) => {
    mutation.mutate({ id })
  }, [mutation]);

  const renderCell = useCallback((sucursal: Sucursal, columnKey: Key) => {
    const cellValue = sucursal[columnKey as keyof Sucursal];
    switch (columnKey) {
      case 'nombre':
      case 'direccion':
      case 'telefono':
      case 'email':
      case 'horarioApertura':
      case 'horarioCierre':
        return <p>{cellValue}</p>;
      case 'actions':
        return (
          <DatatableActions
            row={sucursal}
            title="Editar Sucursal"
            EditComponent={({ onClose }) => {
              const { id, ...sucursalData } = sucursal;
              return <UpsertSucursal sucursal={sucursalData} onClose={onClose} id={id} />
            }
            }
            onDelete={(id) => handleEliminar(id)}
          />
        );
      default:
        return cellValue;
    }
  }, [handleEliminar]);

  if (isLoading) return <p>⏳ Cargando sucursales...</p>;
  if (error) return <p className="text-red-500">❌ {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Sucursales</h1>
        <ButtonDrawer
          title="Agregar sucursal"
          bodyRenderer={({ onClose }) =>
            <UpsertSucursal
              onClose={onClose}
              sucursal={{
                nombre: "",
                direccion: "",
                telefono: "",
                email: "",
                horarioApertura: "",
                horarioCierre: "",
                coordenadas: "",
                idOrganizacion: ""
              }}
              id=''
            />
          }
          buttonRenderer={
            <Button size="sm" color="primary" variant="light">
              <PlusIcon className="w-6 h-6" />
              Agregar sucursal
            </Button>
          }
        />
      </div>
      <Datatable columns={columns} data={data ?? []} renderCell={renderCell} />
    </div>
  );
}

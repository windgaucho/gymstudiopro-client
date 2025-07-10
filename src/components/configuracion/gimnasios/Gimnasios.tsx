// src/routes/gimnasios/component.tsx
import ButtonDrawer from '@/components/common/drawer/ButtonDrawer';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useCallback, type Key } from 'react';

import Datatable from '@/components/common/datatable/Datatable';
import { DatatableActions } from '@/components/common/datatable/DatatableActions';
import { Button } from '@heroui/react';
import UpsertGimnasio from './UpsertGimnasio';
import { useGimnasios, useRemoveGimnasio } from './graphql';
import type { Gimnasio } from './types';

const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Dirección", uid: "direccion" },
  { name: "Teléfono", uid: "telefono" },
  { name: "Email", uid: "email" },
  { name: "Acciones", uid: "actions" },
];

export function GimnasiosPage() {
  const { data, isLoading, error } = useGimnasios();

  const mutation = useRemoveGimnasio();

  const handleEliminar = useCallback(async (id: string) => {
    mutation.mutate({ id })
  }, [mutation]);

  const renderCell = useCallback((gimnasio: Gimnasio, columnKey: Key) => {
    const cellValue = gimnasio[columnKey as keyof Gimnasio];
    switch (columnKey) {
      case 'nombre':
      case 'direccion':
      case 'telefono':
      case 'email':
        return <p>{cellValue}</p>;
      case 'actions':
        return (
          <DatatableActions
            row={gimnasio}
            title="Editar Gimnasio"
            EditComponent={({ onClose }) => {
              const { id, ...gimnasioData } = gimnasio;
              return <UpsertGimnasio gimnasio={gimnasioData} onClose={onClose} id={id} />
            }
            }
            onDelete={(id) => handleEliminar(id)}
          />
        );
      default:
        return cellValue;
    }
  }, [handleEliminar]);

  if (isLoading) return <p>⏳ Cargando gimnasios...</p>;
  if (error) return <p className="text-red-500">❌ {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Gimnasios</h1>
        <ButtonDrawer
          title="Agregar gimnasio"
          bodyRenderer={({ onClose }) =>
            <UpsertGimnasio
              onClose={onClose}
              gimnasio={{ nombre: "", direccion: "", telefono: "", email: "" }}
              id=''
            />
          }
          buttonRenderer={
            <Button size="sm" color="primary" variant="light">
              <PlusIcon className="w-6 h-6" />
              Agregar gimnasio
            </Button>
          }
        />
      </div>
      <Datatable columns={columns} data={data ?? []} renderCell={renderCell} />
    </div>
  );
}

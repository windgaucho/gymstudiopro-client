// src/routes/organizaciones/component.tsx
import ButtonDrawer from '@/components/common/drawer/ButtonDrawer';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useCallback, type Key } from 'react';

import Datatable from '@/components/common/datatable/Datatable';
import { DatatableActions } from '@/components/common/datatable/DatatableActions';
import { Button } from '@heroui/react';
import UpsertOrganizacion from './UpsertOrganizacion';
import { useOrganizaciones, useRemoveOrganizacion } from './graphql';
import type { Organizacion } from './types';

const columns = [
  { name: "Tipo", uid: "tipo" },
  { name: "Nombre", uid: "nombre" },
  { name: "Slug", uid: "slug" },
  { name: "Dirección", uid: "direccion" },
  { name: "Teléfono", uid: "telefono" },
  { name: "Email", uid: "email" },
  { name: "Acciones", uid: "actions" },
];

export function OrganizacionesPage() {
  const { data, isLoading, error } = useOrganizaciones();

  const mutation = useRemoveOrganizacion();

  const handleEliminar = useCallback(async (id: string) => {
    mutation.mutate({ id })
  }, [mutation]);

  const renderCell = useCallback((organizacion: Organizacion, columnKey: Key) => {
    const cellValue = organizacion[columnKey as keyof Organizacion];
    switch (columnKey) {
      case 'tipo':
      case 'nombre':
      case 'slug':
      case 'direccion':
      case 'telefono':
      case 'email':
        return <p>{cellValue}</p>;
      case 'actions':
        return (
          <DatatableActions
            row={organizacion}
            title="Editar Organización"
            EditComponent={({ onClose }) => {
              const { id, ...organizacionData } = organizacion;
              return <UpsertOrganizacion organizacion={organizacionData} onClose={onClose} id={id} />
            }
            }
            onDelete={(id) => handleEliminar(id)}
          />
        );
      default:
        return cellValue;
    }
  }, [handleEliminar]);

  if (isLoading) return <p>⏳ Cargando organizaciones...</p>;
  if (error) return <p className="text-red-500">❌ {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Organizaciones</h1>
        <ButtonDrawer
          title="Agregar organización"
          bodyRenderer={({ onClose }) =>
            <UpsertOrganizacion
              onClose={onClose}
              organizacion={{ tipo: "", nombre: "", slug: "", preferencias: "", direccion: "", telefono: "", email: "" }}
              id=''
            />
          }
          buttonRenderer={
            <Button size="sm" color="primary" variant="light">
              <PlusIcon className="w-6 h-6" />
              Agregar organización
            </Button>
          }
        />
      </div>
      <Datatable columns={columns} data={data ?? []} renderCell={renderCell} />
    </div>
  );
}

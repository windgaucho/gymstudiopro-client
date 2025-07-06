// src/routes/gimnasios/component.tsx
import ButtonDrawer from '@/components/common/drawer/ButtonDrawer';
import { Icon } from '@iconify-icon/react';
import { useCallback, type Key } from 'react';

import Datatable from '@/components/common/datatable/Datatable';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@heroui/react";
import UpsertGimnasio from './UpsertGimnasio';
import type { Gimnasio } from './types';
import { useGimnasios } from './graphql';

const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Dirección", uid: "direccion" },
  { name: "Teléfono", uid: "telefono" },
  { name: "Email", uid: "email" },
  { name: "Acciones", uid: "actions" },
];

export function GimnasiosPage() {
  const { data, isLoading, error } = useGimnasios();

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
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="solar:menu-dots-line-duotone" width="24" height="24" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit">
                  <ButtonDrawer
                    buttonVariant="light"
                    title="Editar gimnasio"
                    bodyRenderer={({ onClose }) =>
                      <UpsertGimnasio
                        onClose={onClose}
                        gimnasio={gimnasio}
                        id={gimnasio.id}
                      />
                    }
                    buttonIcon={<Icon icon="solar:clapperboard-edit-line-duotone" />}
                    buttonTitle='Editar'
                  />
                </DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
              gimnasio={{ nombre: "GIMNASIO 1", direccion: "", telefono: "", email: "" }}
              id=''
            />
          }
          buttonIcon={<Icon icon="solar:add-circle-line-duotone" />}
          buttonTitle='Agregar gimnasio'
        />
      </div>
      <Datatable columns={columns} data={data ?? []} renderCell={renderCell} />
    </div>
  );
}

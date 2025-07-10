import ButtonDrawer from "@/components/common/drawer/ButtonDrawer";
import { Button } from "@heroui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import ButtonRemove from "../buttons/ButtonRemove";

interface DatatableActionsProps<T> {
  row: T;
  title: string;
  onDelete?: (id: string) => Promise<void>;
  EditComponent: React.ComponentType<{ onClose: () => void; id: string } & T>;
}

export function DatatableActions<T extends { id: string }>({
  row,
  title,
  EditComponent,
  onDelete
}: DatatableActionsProps<T>) {
  return (
    <div className="flex justify-center items-center gap-4">
      <ButtonDrawer
        title={title}
        bodyRenderer={({ onClose }) => (
          <EditComponent
            onClose={onClose}
            {...row}
            id={row.id}
          />
        )}
        buttonRenderer={
          <Button isIconOnly={true} size="sm" variant="light">
            <PencilSquareIcon className="w-6 h-6" />
          </Button>
        }
      />
      {onDelete &&
        <ButtonRemove
          title="Eliminar"
          description="¿Estás seguro de eliminar este registro?"
          buttonIcon={<TrashIcon />}
          onConfirm={() => onDelete(row.id)}
        />
      }
    </div>
  );
}

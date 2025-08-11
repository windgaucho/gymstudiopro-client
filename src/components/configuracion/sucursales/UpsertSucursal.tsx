import { Spinner } from "@heroui/react";
import { useUpsertSucursal } from "./graphql";
import type { InputSucursal } from "./types";
import SucursalForm from "./SucursalForm";

declare interface Props {
  id: string;
  sucursal: InputSucursal,
  onClose: () => void;
}

function UpsertSucursal({ id, sucursal, onClose }: Props) {
  const mutation = useUpsertSucursal()
  const handleSubmit = (sucursal: InputSucursal) => {
    mutation.mutate({ id, sucursal })
    onClose()
  }

  if (mutation.isPending) {
    return (
      <div className={`p-2 text-2xl`}>
        <Spinner />
      </div>
    )
  }

  return (
    <SucursalForm
      sucursal={sucursal}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default UpsertSucursal

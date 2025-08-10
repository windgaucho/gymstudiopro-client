import { Spinner } from "@heroui/react";
import { useUpsertOrganizacion } from "./graphql";
import type { InputOrganizacion } from "./types";
import OrganizacionForm from "./OrganizacionForm";

declare interface Props {
  id: string;
  organizacion: InputOrganizacion,
  onClose: () => void;
}

function UpsertOrganizacion({ id, organizacion, onClose }: Props) {
  const mutation = useUpsertOrganizacion()

  const handleSubmit = (organizacion: InputOrganizacion) => {
    mutation.mutate({ id, organizacion })
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
    <OrganizacionForm
      organizacion={organizacion}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default UpsertOrganizacion
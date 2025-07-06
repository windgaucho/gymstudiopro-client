import { Spinner } from "@heroui/react";
import { useUpsertGimnasio } from "./graphql";
import type { InputGimnasio } from "./types";
import GimnasioForm from "./GimnasioForm";

declare interface Props {
  id: string;
  gimnasio: InputGimnasio,
  onClose: () => void;
}

function UpsertGimnasio({ id, gimnasio, onClose }: Props) {
  const mutation = useUpsertGimnasio()

  const handleSubmit = (gimnasio: InputGimnasio) => {
    mutation.mutate({ id, gimnasio })
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
    <GimnasioForm
      gimnasio={gimnasio}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default UpsertGimnasio
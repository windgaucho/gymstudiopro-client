import { Form, Input } from "@heroui/react";
import type { InputGimnasio } from "./types";
import { FormActions } from "@/components/common/forms/FormActions";

declare interface Props {
  gimnasio: InputGimnasio,
  onClose: () => void;
  onSubmit: (gimnasio: InputGimnasio) => void;
}

export default function GimnasioForm({ gimnasio, onClose, onSubmit }: Props) {
  const handleSubmit = (values: InputGimnasio) => {
    onSubmit(values)
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget)) as InputGimnasio;
        handleSubmit(data)
      }}
    >
      <Input
        isRequired
        errorMessage="ingrese el nombre del gimnasio"
        label="Nombre"
        labelPlacement="outside"
        name="nombre"
        placeholder="Nombre del gimnasio"
        type="text"
        defaultValue={gimnasio.nombre}
      />
      <Input
        isRequired
        errorMessage="ingrese la dirección del gimnasio"
        label="Dirección"
        labelPlacement="outside"
        name="direccion"
        placeholder="Dirección del gimnasio"
        type="text"
        defaultValue={gimnasio.direccion}
      />
      <Input
        isRequired
        errorMessage="ingrese el teléfono del gimnasio"
        label="Teléfono"
        labelPlacement="outside"
        name="telefono"
        placeholder="Teléfono del gimnasio"
        type="text"
        defaultValue={gimnasio.telefono}
      />
      <Input
        isRequired
        errorMessage="ingrese el email del gimnasio"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Email del gimnasio"
        type="email"
        defaultValue={gimnasio.email}
      />
      <FormActions onCancel={onClose} />
    </Form>
  )
}


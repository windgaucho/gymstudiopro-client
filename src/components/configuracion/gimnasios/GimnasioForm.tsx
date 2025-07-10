import { Form, Input } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import type { InputGimnasio } from "./types";
import { FormActions } from "@/components/common/forms/FormActions";

declare interface Props {
  gimnasio: InputGimnasio,
  onClose: () => void;
  onSubmit: (gimnasio: InputGimnasio) => void;
}

export default function GimnasioForm({ gimnasio, onClose, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputGimnasio>({
    defaultValues: gimnasio,
  });

  const onSubmitForm = (values: InputGimnasio) => {
    onSubmit(values);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="nombre"
        control={control}
        rules={{ required: "El nombre es requerido" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Nombre"
            labelPlacement="outside"
            placeholder="Nombre del gimnasio"
            type="text"
            isInvalid={!!errors.nombre}
            errorMessage={errors.nombre?.message}
          />
        )}
      />
      <Controller
        name="direccion"
        control={control}
        rules={{ required: "La dirección es requerida" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Dirección"
            labelPlacement="outside"
            placeholder="Dirección del gimnasio"
            type="text"
            isInvalid={!!errors.direccion}
            errorMessage={errors.direccion?.message}
          />
        )}
      />
      <Controller
        name="telefono"
        control={control}
        rules={{ required: "El teléfono es requerido" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Teléfono"
            labelPlacement="outside"
            placeholder="Teléfono del gimnasio"
            type="text"
            isInvalid={!!errors.telefono}
            errorMessage={errors.telefono?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: "El email es requerido",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido"
          }
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            labelPlacement="outside"
            placeholder="Email del gimnasio"
            type="email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <FormActions onCancel={onClose} />
    </Form>
  );
}


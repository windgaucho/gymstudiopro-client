import TipoOrganizacionComboBox from "@/components/combobox/TipoOrganizacionComboBox";
import { FormActions } from "@/components/forms/FormActions";
import { Form, Input, Textarea } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import type { InputOrganizacion } from "./types";

declare interface Props {
  organizacion: InputOrganizacion,
  onClose: () => void;
  onSubmit: (organizacion: InputOrganizacion) => void;
}

export default function OrganizacionForm({ organizacion, onClose, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputOrganizacion>({
    defaultValues: organizacion,
  });

  const onSubmitForm = (values: InputOrganizacion) => {
    onSubmit(values);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="tipo"
        control={control}
        rules={{ required: "El tipo es requerido" }}
        render={({ field, fieldState: { error, invalid } }) => (
          <TipoOrganizacionComboBox
            {...field}
            fullWidth
            isRequired
            errorMessage={error?.message}
            // Let React Hook Form handle validation instead of the browser.
            validationBehavior="aria"
            isInvalid={invalid}
          />
        )}
      />
      <Controller
        name="nombre"
        control={control}
        rules={{ required: "El nombre es requerido" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Nombre"
            labelPlacement="outside"
            placeholder="Nombre de la organización"
            type="text"
            isInvalid={!!errors.nombre}
            errorMessage={errors.nombre?.message}
          />
        )}
      />
      <Controller
        name="slug"
        control={control}
        rules={{ required: "El slug es requerido" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Slug"
            labelPlacement="outside"
            placeholder="slug-de-la-organizacion"
            type="text"
            isInvalid={!!errors.slug}
            errorMessage={errors.slug?.message}
          />
        )}
      />
      <Controller
        name="preferencias"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            value={typeof field.value === 'string' ? field.value : JSON.stringify(field.value || {})}
            label="Preferencias (JSON)"
            labelPlacement="outside"
            placeholder='{"tema": "dark", "idioma": "es"}'
            isInvalid={!!errors.preferencias}
            errorMessage={errors.preferencias?.message?.toString()}
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
            placeholder="Dirección de la organización"
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
            placeholder="Teléfono de la organización"
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
            placeholder="Email de la organización"
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


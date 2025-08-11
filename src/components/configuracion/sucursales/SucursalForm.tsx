import { Form, Input } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import type { InputSucursal } from "./types";
import { FormActions } from "@/components/forms/FormActions";
import OrganizacionComboBox from "@/components/combobox/OrganizacionComboBox";

declare interface Props {
  sucursal: InputSucursal,
  onClose: () => void;
  onSubmit: (sucursal: InputSucursal) => void;
}

export default function SucursalForm({ sucursal, onClose, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputSucursal>({
    defaultValues: sucursal,
  });

  const onSubmitForm = (values: InputSucursal) => {
    onSubmit(values);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="idOrganizacion"
        control={control}
        rules={{ required: "La organización es requerida" }}
        render={({ field, fieldState: { error, invalid } }) => (
          <OrganizacionComboBox
            {...field}
            fullWidth
            isRequired
            errorMessage={error?.message}
            // Let React Hook Form handle validation instead of the browser.
            validationBehavior="aria"
            isInvalid={invalid} />
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
            placeholder="Nombre de la sucursal"
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
            placeholder="Dirección de la sucursal"
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
            placeholder="Teléfono de la sucursal"
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
            placeholder="Email de la sucursal"
            type="email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        name="horarioApertura"
        control={control}
        rules={{ required: "El horario de apertura es requerido" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Horario de Apertura"
            labelPlacement="outside"
            placeholder="08:00"
            type="time"
            isInvalid={!!errors.horarioApertura}
            errorMessage={errors.horarioApertura?.message}
          />
        )}
      />
      <Controller
        name="horarioCierre"
        control={control}
        rules={{ required: "El horario de cierre es requerido" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Horario de Cierre"
            labelPlacement="outside"
            placeholder="22:00"
            type="time"
            isInvalid={!!errors.horarioCierre}
            errorMessage={errors.horarioCierre?.message}
          />
        )}
      />
      <Controller
        name="coordenadas"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Coordenadas"
            labelPlacement="outside"
            placeholder="latitud,longitud"
            type="text"
            isInvalid={!!errors.coordenadas}
            errorMessage={errors.coordenadas?.message}
          />
        )}
      />
      <FormActions onCancel={onClose} />
    </Form>
  );
}

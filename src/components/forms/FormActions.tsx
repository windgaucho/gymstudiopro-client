import { Button } from "@heroui/react";

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export function FormActions({
  onCancel,
  isSubmitting = false,
  submitLabel = "Guardar",
  cancelLabel = "Cancelar"
}: FormActionsProps) {
  return (
    <div className='flex justify-end gap-3 w-full mt-4'>
      <Button color="primary" type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
      <Button
        color="default"
        onPress={() => {
          onCancel();
        }}
      >
        {cancelLabel}
      </Button>
    </div>
  );
}
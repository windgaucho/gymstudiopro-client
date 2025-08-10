import { cloneElement } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@heroui/react";

export interface ButtonRemoveProps {
  onConfirm: () => Promise<unknown>;
  disabled?: boolean;
  buttonIcon?: React.ReactNode;
  buttonTitle?: string;
  title?: string;
  description?: string;
}

const ButtonRemove = ({
  onConfirm,
  disabled,
  buttonIcon,
  title,
  description,
  buttonTitle,
}: ButtonRemoveProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Error during confirmation:', error);
    }
  };

  return (
    <>
      <Button
        isIconOnly={!buttonTitle && !!buttonIcon}
        size="sm"
        color="danger"
        variant="solid"
        onPress={onOpen}
        isDisabled={disabled}
      >
        {buttonTitle}
        {buttonIcon && cloneElement(buttonIcon as React.ReactElement)}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
              <ModalBody>
                <p>{description}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={handleConfirm}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonRemove
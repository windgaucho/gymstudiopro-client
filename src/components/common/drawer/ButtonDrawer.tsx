import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import { cloneElement, useState, type ReactElement } from "react";

export interface ButtonDrawerProps {
  bodyRenderer: (props: { onClose: () => void }) => ReactElement;
  title: string;
  buttonIcon?: React.ReactNode;
  buttonTitle?: string;
  disabled?: boolean;
  buttonSize?: "sm" | "md" | "lg";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  buttonColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  buttonVariant?: "solid" | "light" | "flat" | "faded" | "shadow" | "bordered";
}

export default function ButtonDrawer({
  bodyRenderer,
  title = "Button Drawer",
  buttonIcon,
  buttonTitle,
  disabled,
  buttonVariant = "solid",
  buttonSize = "md",
  buttonColor = "primary",
  size = "3xl",
}: Readonly<ButtonDrawerProps>) {
  const [opened, setOpened] = useState(false);

  const handleOpened = (opened: boolean) => {
    //setOpened(opened);
  };

  const handleClose = () => {
    //handleOpened(false);
  };

  console.log('opened', opened)
  return (
    <>
      <Button
        onPress={() => setOpened(true)}
        startContent={buttonIcon && cloneElement(buttonIcon as React.ReactElement)}
        size={buttonSize}
        color={buttonColor}
        isDisabled={disabled}
        variant={buttonVariant}
      >
        {buttonTitle}
      </Button>
      <Drawer
        isOpen={opened}
        onClose={handleClose}
        size={size}
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
          <DrawerBody>
            {bodyRenderer({ onClose: () => setOpened(false) })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

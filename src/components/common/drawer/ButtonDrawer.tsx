import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import { cloneElement, useState, type ReactElement } from "react";

export interface ButtonDrawerProps {
  bodyRenderer: (props: { onClose: () => void }) => ReactElement;
  buttonRenderer: ReactElement<{ onPress?: () => void }>;
  title: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}

export default function ButtonDrawer({
  bodyRenderer,
  buttonRenderer,
  title,
  size = "3xl",
}: Readonly<ButtonDrawerProps>) {
  const [opened, setOpened] = useState(false);

  const button = cloneElement(buttonRenderer, {
    onPress: () => setOpened(true)
  })

  return (
    <>
      {button}

      <Drawer
        isOpen={opened}
        onClose={() => setOpened(false)}
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

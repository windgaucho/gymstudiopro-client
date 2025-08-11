import { Select, SelectItem } from "@heroui/react";

declare interface ComboBoxProps<T> extends ComboBoxPropsBase {
  dataItems: T[] | null | undefined;
  labelPath?: keyof T;
  valuePath?: keyof T;
  errorFetch?: ErrorResult;
}

interface ComboBoxItem {
  label: string;
  value: string;
}

export default function ComboBox<T>({
  dataItems,
  labelPath,
  valuePath,
  ...props
}: Readonly<ComboBoxProps<T>>) {

  const filteredItems: ComboBoxItem[] = (dataItems || []).map((item) => {
    if (["string", "number"].includes(typeof item)) {
      return {
        label: String(item),
        value: String(item)
      }
    } else {
      if (!labelPath || !valuePath) {
        throw new Error("las propiedades labelPath y valuePath son requeridas");
      }

      return {
        label: String(item[labelPath]),
        value: String(item[valuePath])
      }
    }
  });

  return (
    <Select {...props} items={filteredItems} selectedKeys={[props.value]}>
      {filteredItems.map((item) => (
        <SelectItem key={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
}

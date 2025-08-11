import { useOrganizaciones } from "../configuracion/organizaciones/graphql";
import ComboBox from "./ComboBox";

export default function OrganizacionComboBox(props: Readonly<ComboBoxPropsBase>) {
  const { data, isPending, error } = useOrganizaciones();

  return (
    <ComboBox
      {...props}
      isLoading={isPending}
      errorMessage={error?.message}
      dataItems={data}
      valuePath="id"
      labelPath="nombre"
      style={{ textTransform: "uppercase" }}
    />
  )
}

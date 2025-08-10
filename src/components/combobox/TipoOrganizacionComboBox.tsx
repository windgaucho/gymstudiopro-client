import ComboBox from "./ComboBox";

export default function TipoOrganizacionComboBox(props: Readonly<ComboBoxPropsBase>) {
  const dataItems = [
    {
      label: "Gimnasio",
      value: "gimnasio"
    },
    {
      label: "Entrenador Personal",
      value: "entrenador_personal"
    },
    {
      label: "Estudio",
      value: "estudio"
    }
  ];

  return (
    <ComboBox
      {...props}
      dataItems={dataItems}
      valuePath="value"
      labelPath="label"
      style={{ textTransform: "uppercase" }}
    />
  )
}

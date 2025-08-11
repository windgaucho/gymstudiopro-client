export type Sucursal = {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  horarioApertura: string;
  horarioCierre: string;
  coordenadas: string;
  idOrganizacion: string;
};

export type InputSucursal = {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  horarioApertura: string;
  horarioCierre: string;
  coordenadas: string;
  idOrganizacion: string;
}

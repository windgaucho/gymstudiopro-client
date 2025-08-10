export type Organizacion = {
  id: string;
  tipo: string;
  nombre: string;
  slug: string;
  preferencias: Record<string, unknown>;
  direccion: string;
  telefono: string;
  email: string;
};

export type InputOrganizacion = {
  tipo: string;
  nombre: string;
  slug: string;
  preferencias: Record<string, unknown>;
  direccion: string;
  telefono: string;
  email: string;
}
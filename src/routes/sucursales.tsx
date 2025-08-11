import { createFileRoute } from '@tanstack/react-router'
import { SucursalesPage } from '../components/configuracion/sucursales/Sucursales'

export const Route = createFileRoute('/sucursales')({
  component: SucursalesPage,
})

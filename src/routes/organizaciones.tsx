import { createFileRoute } from '@tanstack/react-router'
import { OrganizacionesPage } from '../components/configuracion/organizaciones/Organizaciones'

export const Route = createFileRoute('/organizaciones')({
  component: OrganizacionesPage,
})

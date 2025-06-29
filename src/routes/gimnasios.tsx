import { createFileRoute } from '@tanstack/react-router'
import { GimnasiosPage } from '../components/configuracion/gimnasios/Gimnasios'

export const Route = createFileRoute('/gimnasios')({
  component: GimnasiosPage,
})

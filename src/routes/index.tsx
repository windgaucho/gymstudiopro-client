import { Button } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>INDEX</h1>
      <Button color="primary">Click me</Button>
    </div>
  )
}

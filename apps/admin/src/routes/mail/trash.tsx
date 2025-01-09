import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mail/trash')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mail/trash"!</div>
}

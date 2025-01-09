import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mail/sent')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mail/sent"!</div>
}

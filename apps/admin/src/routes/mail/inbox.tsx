import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mail/inbox')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mail/inbox"!</div>
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/reset')({
  component: Index,
})

function Index() {
  return <></>
}

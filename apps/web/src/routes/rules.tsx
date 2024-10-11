import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rules')({
  component: Index,
})
function Index() {
  return <></>
}

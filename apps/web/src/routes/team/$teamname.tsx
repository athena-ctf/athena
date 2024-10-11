import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/team/$teamname')({
  component: Index,
})

function Index() {
  return <></>
}

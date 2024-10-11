import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/scoreboard/team')({
  component: Index,
})

function Index() {
  return <></>
}

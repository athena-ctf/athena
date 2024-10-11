import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/team')({
  component: Index,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData
  },
})

function Index() {
  return <></>
}

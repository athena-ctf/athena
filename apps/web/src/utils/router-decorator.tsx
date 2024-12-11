import type { Decorator } from "@storybook/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute();
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/" });
const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ["/"] }) });

export const routerDecorator: Decorator = (Story, context) => {
  // @ts-ignore idk why this is happening?
  return <RouterProvider router={router} defaultComponent={() => <Story {...context} />} />;
};

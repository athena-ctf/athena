import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { TooltipProvider } from "@repo/ui/components/tooltip";
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

export const routerDecorator: Decorator = (Story, context) => (
  // @ts-ignore idk why this is happening?
  <RouterProvider router={router} defaultComponent={() => <Story {...context} />} />
);

export const cardDecorator: (title: string) => Decorator = (title: string) => (Story, context) => (
  <Card className="m-auto max-w-md">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Story {...context} />
    </CardContent>
  </Card>
);

export const tooltipDecorator: Decorator = (Story, context) => (
  <TooltipProvider>
    <Story {...context} />
  </TooltipProvider>
);

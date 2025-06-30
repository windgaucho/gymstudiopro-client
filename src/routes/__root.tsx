import { Layout } from '@/components/common/layout/Layout';
import { Providers } from "@/providers";
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Layout>
        <Outlet />
      </Layout>
      <TanStackRouterDevtools />
    </Providers>
  ),
})
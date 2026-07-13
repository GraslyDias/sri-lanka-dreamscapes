import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-ocean">404</h1>
        <h2 className="mt-4 font-display text-2xl text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink/60">
          The page you're looking for has drifted off the map.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ocean px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-ink"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink/60">
          Something went wrong on our end. Try refreshing or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-ocean px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-ink"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-transparent px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink/5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vaya Ceylon — Private Luxury Journeys Through Sri Lanka" },
      {
        name: "description",
        content:
          "Handcrafted private journeys through Sri Lanka. Designed by local experts, staged in heritage villas, tea estates and hidden safari camps.",
      },
      { name: "author", content: "Vaya Ceylon" },
      { property: "og:title", content: "Vaya Ceylon — Private Luxury Journeys Through Sri Lanka" },
      {
        property: "og:description",
        content:
          "Handcrafted private journeys through Sri Lanka. Designed by local experts, staged in heritage villas, tea estates and hidden safari camps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

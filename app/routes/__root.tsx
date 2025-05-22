import type { ReactNode } from "react";
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import css from "../styles/global.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "EsposonSauce",
      },
    ],
    ...(process.env.NODE_ENV === "production"
      ? {
          links: [{ rel: "stylesheet", href: css }],
        }
      : {}),
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Fascinate&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>

        <script
          src="https://kit.fontawesome.com/f6d01d0f1a.js"
          crossOrigin="anonymous"
        ></script>
        <link rel="manifest" href="/manifest.json"></link>
        <meta name="theme-color" content="#ff5733"></meta>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

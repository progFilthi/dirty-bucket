import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dirty Bucket",
  description: "This is a store for selling & showcasing beats",
  icons: {
    icon: [
      {
        url: "/Db-favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/Db-favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/Db-favicons/apple-touch-icon.png",
    shortcut: "/Db-favicons/favicon.ico",
  },
  manifest: "/Db-favicons/site.webmanifest",
};

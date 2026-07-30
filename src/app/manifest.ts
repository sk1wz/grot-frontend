import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "InfoFusion",
    short_name: "InfoFusion",
    description: "Лучшая система проверки и обработки данных",
    start_url: "/login",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c8ddd5",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}

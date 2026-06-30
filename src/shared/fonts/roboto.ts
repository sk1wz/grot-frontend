import localFont from "next/font/local";

/** Пути относительно этого файла. Для woff2 замените расширения и добавьте italic, как в доке next/font/local. */
export const roboto = localFont({
  src: [
    { path: "./Roboto/Roboto-Thin.ttf", weight: "100", style: "normal" },
    { path: "./Roboto/Roboto-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./Roboto/Roboto-Light.ttf", weight: "300", style: "normal" },
    { path: "./Roboto/Roboto-Regular.ttf", weight: "400", style: "normal" },
    { path: "./Roboto/Roboto-Medium.ttf", weight: "500", style: "normal" },
    { path: "./Roboto/Roboto-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./Roboto/Roboto-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

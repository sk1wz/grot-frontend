import type { Metadata, Viewport } from "next";
import "@/shared/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { roboto } from "@/shared/fonts/roboto";
import { ServiceWorkerRegistration, TouchHoverReset } from "@/shared/ui";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  title: "InfoFusion",
  description: "InfoFusion - сервис проверки, обработки и анализа данных.",
  appleWebApp: {
    capable: true,
    title: "InfoFusion",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${roboto.variable}  h-full antialiased`}
    >
      <body>
        <ServiceWorkerRegistration />
        <TouchHoverReset />
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
        {children}
      </body>
    </html>
  );
}

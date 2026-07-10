import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { roboto } from "@/shared/fonts/roboto";

export const metadata: Metadata = {
  title: "InfoFusion",
  description: "InfoFusion",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable}  h-full antialiased`}
    >
      <body className="min-h-full w-full">
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
        <div className="min-h-full w-full">{children}</div>
      </body>
    </html>
  );
}

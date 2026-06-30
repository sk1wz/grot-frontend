import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { roboto } from "@/shared/fonts/roboto";

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM frontend",
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
      <body className="flex h-full w-full flex-col overflow-hidden">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          storageKey="theme"
        >
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
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

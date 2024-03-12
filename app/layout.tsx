import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twClass } from "@/utils/twClass";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "rent.me",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <body className={twClass(inter.className, "")}>
        <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-8 lg:px-24 py-10">
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}

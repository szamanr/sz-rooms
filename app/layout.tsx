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
      <body className={twClass(inter.className, "min-h-svh")}>
        {children}
        {modal}
      </body>
    </html>
  );
}

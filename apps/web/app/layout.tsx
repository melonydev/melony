import "./globals.css";
import type { Metadata } from "next";
import { rootLayout } from "melony";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MentalConnect",
  description: "MentalConnect",
};

export default function RootLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  return rootLayout({
    appName: "MentalConnect",
    navigate: async (path) => {
      "use server";
      redirect(path);
    },
    children,
  });
}

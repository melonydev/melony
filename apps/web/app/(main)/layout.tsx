"use client";

import { sidebarLayout } from "../components/sidebar-layout";
import { usePathname } from "next/navigation";
import { query, loader, vstack, text } from "melony";
import { getProfileAction } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const pathname = usePathname();

  return query({
    name: "getProfile",
    action: getProfileAction,
    render: (query) => {
      if (query.isPending) {
        return vstack({
          className: "w-full h-screen flex items-center justify-center",
          children: [
            vstack({
              className: "gap-2",
              children: [loader(), text({ children: "Loading..." })],
            }),
          ],
        });
      }

      if (query.isError) {
        return redirect("/login");
      }

      return sidebarLayout({ children, pathname });
    },
  });
}

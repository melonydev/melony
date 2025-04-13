"use client";

import {
  heading,
  spacer,
  text,
  navigationButton,
  vstack,
  hstack,
} from "melony";
import { postsTable } from "../components/posts-table";
import { welcomeSection } from "../components/welcome-section";
import { activitiesList } from "../components/activities-list";

export default function Page() {
  return vstack({
    className: "w-full h-full space-y-4",
    children: [
      // hstack({
      //   className: "justify-between items-center",
      //   children: [
      //     vstack({
      //       children: [
      //         heading({
      //           title: "Posts",
      //         }),
      //         text({
      //           children: "This is a table of posts",
      //         }),
      //       ],
      //     }),
      //     spacer({ className: "ml-auto w-auto" }),
      //     navigationButton({
      //       label: "Create Post",
      //       href: "/posts/create",
      //     }),
      //   ],
      // }),
      welcomeSection(),
      activitiesList(),
      postsTable(),
    ],
  });
}

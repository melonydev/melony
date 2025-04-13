import { hstack } from "melony";
import { vstack } from "melony";
import { sidebar } from "./sidebar";
import { header } from "./header";

export const sidebarLayout = ({
  children,
  pathname,
}: {
  children: React.JSX.Element;
  pathname: string;
}) => {
  return vstack({
    className: "w-full h-screen",
    children: vstack({
      className: "w-full h-full",
      children: [
        header(),
        hstack({
          className: "w-full h-full flex-1 overflow-hidden",
          children: [
            sidebar({ pathname }),
            vstack({
              className: "w-full h-full p-4 flex-1 overflow-y-auto",
              children,
            }),
          ],
        }),
      ],
    }),
  });
};

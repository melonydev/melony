import React from "react";

import { Stack, RootLayout, MelonyProvider, Spacer } from "@melony/ui";

export function rootLayout({
  children,
  appName,
  navigate,
}: {
  children: React.JSX.Element;
  appName: string;
  navigate?: (path: string) => void;
}) {
  return (
    <RootLayout>
      <MelonyProvider appName={appName} navigate={navigate}>
        {children}
      </MelonyProvider>
    </RootLayout>
  );
}

export function vstack({
  children,
  className,
}: {
  children: React.JSX.Element | React.JSX.Element[];
  className?: string;
}) {
  return (
    <Stack className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))
        : children}
    </Stack>
  );
}

export function hstack({
  children,
  className,
}: {
  children: React.JSX.Element | React.JSX.Element[];
  className?: string;
}) {
  return (
    <Stack direction="row" className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))
        : children}
    </Stack>
  );
}

export function spacer(props?: { className?: string }) {
  return <Spacer className={props?.className} />;
}

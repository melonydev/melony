import React from "react";
import { Image } from "@melony/ui";

export const image = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return <Image src={src} alt={alt} className={className} />;
};

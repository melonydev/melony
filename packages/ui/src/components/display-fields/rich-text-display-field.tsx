import { RichTextFieldConfig } from "@/lib/types/fields";

export const RichTextDisplayField = ({
  field,
  value,
}: {
  field: RichTextFieldConfig;
  value: unknown;
}) => {
  return (
    <div
      className="prose dark:prose-invert max-w-screen-lg w-full"
      dangerouslySetInnerHTML={{ __html: value as string }}
    />
  );
};

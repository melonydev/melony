import React from "react";
import { FieldConfig } from "@/lib/types/fields";
import { TextFormField } from "./form-fields/text-form-field";
import { TextareaFormField } from "./form-fields/textarea-form-field";
import { NumberFormField } from "./form-fields/number-form-field";
import { DateFormField } from "./form-fields/date-form-field";
import { SelectFormField } from "./form-fields/select-form-field";
import { BooleanFormField } from "./form-fields/boolean-form-field";
import { UploadFormField } from "./form-fields/upload-form-field";
import { PasswordFormField } from "./form-fields/password-form-field";
import { ImageDisplayField } from "./display-fields/image-display-field";
import { ComboboxFormField } from "./form-fields/combobox-form-field";
import { TextDisplayField } from "./display-fields/text-display-field";
import { BooleanDisplayField } from "./display-fields/boolean-display-field";
import { DateDisplayField } from "./display-fields/date-display-field";
import { JsonFormField } from "./form-fields/json-form-field";
import { NumberDisplayField } from "./display-fields/number-display-field";
import { SelectDisplayField } from "./display-fields/select-display-field";
import { IconDisplayField } from "./display-fields/icon-display-field";
import { ObjectFormField } from "./form-fields/object-form-field";
import { ArrayFormField } from "./form-fields/array-form-field";
import { BadgeDisplayField } from "./display-fields/badge-display-field";
import { RichTextDisplayField } from "./display-fields/rich-text-display-field";
import { DetailsDisplayField } from "./display-fields/details-display-field";
import { ListDisplayField } from "./display-fields/list-display-field";
import { transformData } from "@/lib/utils";

interface FieldRendererProps {
  field: FieldConfig;
  data?: Record<string, unknown>;
  mode: "read" | "edit";
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  data,
  mode,
}) => {
  const renderReadMode = () => {
    const value = data?.[field.name as string];

    const transformedValue = transformData(value, field?.transform);

    switch (field.type) {
      case "text":
        return <TextDisplayField field={field} value={transformedValue} />;
      case "number":
        return <NumberDisplayField value={transformedValue} />;
      case "date":
        return <DateDisplayField field={field} value={transformedValue} />;
      case "select":
        return <SelectDisplayField field={field} value={transformedValue} />;
      case "boolean":
        return <BooleanDisplayField value={transformedValue} />;
      case "image":
        return <ImageDisplayField field={field} value={transformedValue} />;
      case "icon":
        return <IconDisplayField field={field} value={transformedValue} />;
      case "badge":
        return <BadgeDisplayField field={field} value={transformedValue} />; // its only used in a read mode
      case "rich-text":
        return <RichTextDisplayField field={field} value={transformedValue} />;
      case "details":
        return <DetailsDisplayField field={field} value={transformedValue} />;
      case "list":
        return <ListDisplayField field={field} value={transformedValue} />;
      default:
        return null;
    }
  };

  const renderEditMode = () => {
    switch (field.type) {
      case "text":
        return <TextFormField field={field} />;
      case "password":
        return <PasswordFormField field={field} />;
      case "textarea":
        return <TextareaFormField field={field} />;
      case "number":
        return <NumberFormField field={field} />;
      case "date":
        return <DateFormField field={field} />;
      case "select":
        return <SelectFormField field={field} />;
      case "boolean":
        return <BooleanFormField field={field} />;
      case "upload":
        return <UploadFormField field={field} />;
      case "combobox":
        return <ComboboxFormField field={field} />;
      case "json":
        return <JsonFormField field={field} />;
      case "object":
        return <ObjectFormField field={field} />;
      case "array":
        return <ArrayFormField field={field} />;
      default:
        return null;
    }
  };

  return mode === "read" ? renderReadMode() : renderEditMode();
};

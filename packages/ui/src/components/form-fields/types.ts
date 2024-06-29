import { Field } from "@melony/types";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export type FormFieldProps = {
	field: Field;
	formFieldProps: ControllerRenderProps<FieldValues, string>;
};

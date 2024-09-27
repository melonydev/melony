import { DisplayColor } from "./components/display-fields/display-color";
import { DisplayRelationship } from "./components/display-fields/display-relationship";
import { DisplayImage } from "./components/display-fields/display-image";
import { DisplayText } from "./components/display-fields/display-text";
import { FormColor } from "./components/form-fields/form-color";
import { FormCombobox } from "./components/form-fields/form-combobox";
import { FormImage } from "./components/form-fields/form-image";
import { FormText } from "./components/form-fields/form-text";
import { FormNumber } from "./components/form-fields/form-number";
import { FormSelect } from "./components/form-fields/form-select";
import { DisplayRichText } from "./components/display-fields/display-rich-text";
import { FormRichText } from "./components/form-fields/form-rich-text";
import { FormPassword } from "./components/form-fields/form-password";

export const DEFAULT_COMPONENTS_MAP = {
	text: {
		display: DisplayText,
		form: FormText,
	},
	password: {
		display: DisplayText,
		form: FormPassword,
	},
	email: {
		display: DisplayText,
		form: FormText,
	},
	rich: {
		display: DisplayRichText,
		form: FormRichText,
	},
	number: {
		display: DisplayText,
		form: FormNumber,
	},
	checkbox: {
		display: DisplayText,
		form: FormText,
	},
	select: {
		display: DisplayText,
		form: FormSelect,
	},
	relationship: {
		display: DisplayRelationship,
		form: FormCombobox,
	},
	image: {
		display: DisplayImage,
		form: FormImage,
	},
	color: {
		display: DisplayColor,
		form: FormColor,
	},
};

export const DEFAULT_PAGE_SIZE = 10;

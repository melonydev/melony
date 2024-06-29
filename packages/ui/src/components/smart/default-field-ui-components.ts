import { DisplayColor } from "../display-fields/display-color";
import { DisplayRelationship } from "../display-fields/display-relationship";
import { DisplayImage } from "../display-fields/display-image";
import { DisplayText } from "../display-fields/display-text";
import { FormColor } from "../form-fields/form-color";
import { FormCombobox } from "../form-fields/form-combobox";
import { FormImage } from "../form-fields/form-image";
import { FormText } from "../form-fields/form-text";
import { FormNumber } from "../form-fields/form-number";
import { FormSelect } from "../form-fields/form-select";
import { DisplayRichText } from "../display-fields/display-rich-text";
import { FormRichText } from "../form-fields/form-rich-text";

export const DEFAULT_FIELD_UI_COMPONENTS = {
	text: {
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

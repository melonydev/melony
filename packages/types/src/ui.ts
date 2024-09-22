export type UI = {
	logo?: any; // JSX.Element
	colors?: {
		primary: string;
		border?: string;
	};
	radius?: number;
	font?: {
		className: string;
		style: {
			fontFamily: string;
			fontWeight?: number;
			fontStyle?: string;
		};
	};
};

import { TextFieldFormElement } from './fields/TextField'

export type ElementsType = 'TextField'

export type FormElement = {
	type: ElementsType;

	construct: (id: string) => FormElementInstance

	designBtnElement: {
		icon: React.ElementsType
		label: string
	}

	designerComponent: React.FC
	formComponent: React.FC
	propertiesComponent: React.FC
}
// Type of FormElementInstance
export type FormElementInstance = {
	id: string
	type: ElementsType
	extraAttributes?: Record<string, any>
}

// Type of FormElements
type FormElementsType = {
	[key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
	TextField: TextFieldFormElement,
}

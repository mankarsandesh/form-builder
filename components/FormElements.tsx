import { TextFieldFormElement } from './fields/TextField'

export type ElementsType = 'TextField'

export type FormElementType = {
	type: ElementType

	construct: (id: string) => FormElementInstance

	designBtnElement: {
		icon: React.ElementType
		label: string
	}

	designerComponent: React.FC
	formComponent: React.FC
	propertiesComponent: React.FC
}

export type FormElementInstance = {
	id: string
	type: ElementType
	extraAttributes?: Record<string, any>
}

type FormElementsType = {
	[key in ElementsType]: FormElementType
}

export const FormElements: FormElementsType = {
	TextField: TextFieldFormElement,
}

'use client'

import { MdTextFields } from 'react-icons/md'
import { ElementsType, FormElements } from './Formelements'

const type: ElementsType = 'TextField'

export const TextFieldFormElement: FormElements = {
	type,
	constrct: (id: string) => ({
		id,
		type,
		extraAttributes: {
			label: 'Text Field',
			helperText: 'Helper Text',
			required: false,
			placeholder: 'Placeholder',
		},
	}),
	designBtnElement: {
		icon: MdTextFields,
		label: 'Text Field',
	},
	designerComponent: () => <div>Design Components</div>,
	formComponent: () => <div>Design Components</div>,
	propertiesComponent: () => <div>Design Components</div>,
}

'use client'

import { ReactNode, createContext, useState } from 'react'
import { FormElementInstance } from '../Formelements'

type DesignerContextType = {
	elements: FormElementInstance[]
	addElement: (index: number, element: FormElementInstance) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [elements, setElement] = useState<FormElementInstance[]>([])

	const addElement = (index: number, element: FormElementInstance) => {
		setElement((prev) => {
			const copy = [...prev]
			copy.splice(index, 0, element)
			return copy
		})
	}
	return (
		<DesignerContext.Provider value={{ elements, addElement }}>
			{children}
		</DesignerContext.Provider>
	)
}

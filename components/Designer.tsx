'use client'
import React from 'react'
import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

import DesignerSidebar from './DesignerSidebar'
import useDesigner from '@/components/hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './Formelements'
import { idGenerator } from '@/lib/idGenerator'
import { Form } from '@prisma/client'

function Designer() {
	const { elements, addElement } = useDesigner()

	const droppable = useDroppable({
		id: 'designer-drop-area',
		data: {
			isDesignDropArea: true,
		},
	})
	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event
			if (!active || !over) return

			const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
			if (isDesignerBtnElement) {
				const type = active.data?.current?.type
				console.log(type, 'type')
				console.log(event, 'event')
				const newElement = FormElements[type as ElementsType].construct(
					idGenerator()
				)
				// const newElement = FormElements[type as ElementsType].construct(
				// 	idGenerator()
				// )
				addElement(elements.length, newElement)
				console.log(addElement, 'addElement')
				return
			}
		},
	})
	return (
		<div className="flex w-full h-full">
			<div className="p-4 w-full">
				<div
					ref={droppable.setNodeRef}
					className={cn(
						'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
						droppable.isOver && 'ring-2 ring-primary/20'
					)}
				>
					{!droppable.isOver && (
						<p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
							Drop Here
						</p>
					)}
					{droppable.isOver && (
						<div className="p-4 w-full">
							<div className="h-[120px] rounded-md bg-primary/20"></div>
						</div>
					)}
					{elements.length > 0 && (
						<div className="flex flex-col text-background w-full gap-2 p-4">
							{elements.map((element, index) => (
								<DesignerElementWrapper key={element.id} element={element} />
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSidebar />
		</div>
	)
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
	const DesignrElement = FormElements[element.type].designerComponent
	return <DesignrElement />
}
export default Designer

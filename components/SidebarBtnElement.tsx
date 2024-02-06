import React from 'react'
import { FormElement } from './Formelements'
import { useDraggable } from '@dnd-kit/core'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

function SidebarBtnElement({ formElement }: { FormElement: FormElement }) {
	const { icon: Icon, label } = formElement.designBtnElement
	const draggable = useDraggable({
		id: `designer-btn-${formElement.type}`,
		data: {
			type: formElement.type,
			isDesignerBtnElement: true,
		},
	})

	return (
		<Button
			ref={draggable.setNodeRef}
			variant={'outlined'}
			className={cn(
				'flex flex-col gap-2 h-[120px] w-[120px] curspr-grab',
				draggable.isDragging && 'ring-2 ring-primary'
			)} // TODO: Fix this)"
			{...draggable.listeners}
			{...draggable.attributes}
		>
			<Icon className="h-8 w-8 text-primary cursor-grab" />
			<span className="text-xs">{label}</span>
		</Button>
	)
}

export function SidebarBtnElementDragOverlay({
	formElement,
}: {
	formElement: FormElements
}) {
	const { icon: Icon, label } = formElement.designBtnElement
	return (
		<Button
			variant={'outlined'}
			className="flex flex-col gap-2 h-[120px] w-[120px] curspr-grab"
		>
			<Icon className="h-8 w-8 text-primary cursor-grab" />
			<span className="text-xs">{label}</span>
		</Button>
	)
}

export default SidebarBtnElement

import React from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi'
const PreviewDialogBtn = () => {
	return (
		<Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
			<HiSaveAs className="w-4 h-4" />
			Publish
		</Button>
	)
}

export default PreviewDialogBtn

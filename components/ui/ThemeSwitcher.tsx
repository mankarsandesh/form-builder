'use client'

import React, { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { SunIcon } from '@radix-ui/react-icons'

const ThemeSwitcher = () => {
	const [theme, setTheme] = React.useState()
	const [mounted, setMounted] = React.useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	return (
		<Tabs defaultValue={theme}>
			<TabsList className="border">
				<TabsTrigger value="light" onClick={() => setTheme('light')}>
					<SunIcon className="h-[1.2rem] w-[1.2rem]" />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export default ThemeSwitcher

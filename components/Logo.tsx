import Link from 'next/link'
import React from 'react'

const Logo = () => {
	return (
		<Link
			href={'/'}
			className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
		>
			Form Builder
		</Link>
	)
}

export default Logo

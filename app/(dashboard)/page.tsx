import { GetFormStats, GetForm } from '@/actions/form'
import { Suspense } from 'react'
import { LuView } from 'react-icons/lu'
import { FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { TbArrowBounce } from 'react-icons/tb'
import { BiRightArrowAlt } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { formatDistance } from 'date-fns'
import { Separator } from '@/components/ui/separator'
import CreateFormBtn from '@/components/CreateFormBtn'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

import {
	Card,
	CardHeader,
	CardTitle,
	CardFooter,
	CardContent,
	CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
export default function Home() {
	return (
		<div className="container pt-4">
			<Suspense fallback={<StatsCards loading={false} />}>
				<CardStatsWrapper />
			</Suspense>
			<Separator className="my-6 " />
			<h2 className="text-4xl font-bold col-span-2">Your forms</h2>
			<Separator className="my-6" />
			<div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<CreateFormBtn />
				<Suspense
					fallback={[1, 2, 3, 4].map((el) => {
						;<FormCardSkeleton key={el} />
					})}
				>
					<FormCards />
				</Suspense>
			</div>
		</div>
	)
}
// Cards Wrapper
async function CardStatsWrapper() {
	const stats = await GetFormStats()
	return <StatsCards loading={false} data={stats} />
}
// Stats Cards Component
interface StatsCardProps {
	data?: Awaited<ReturnType<typeof GetFormStats>>
	loading: boolean
}
// Stats Cards Component
function StatsCards(props: StatsCardProps) {
	const { loading, data } = props
	return (
		<div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			<StatsCard
				title="Total visits"
				icon={<LuView className="text-blue-600" />}
				helpText="Total visits to your forms"
				value={data?.visits?.toLocaleString() || ''}
				loading={loading}
				className="shadow-md  shadow-blue-600"
			/>
			<StatsCard
				title="Total Submissions"
				icon={<LuView className="text-blue-600" />}
				helpText="Total visits to your forms"
				value={data?.submissions?.toLocaleString() || ''}
				loading={loading}
				className="shadow-md  shadow-blue-600"
			/>
			<StatsCard
				title=" Submissions Rate"
				icon={<LuView className="text-blue-600" />}
				helpText="Total visits to your forms"
				value={data?.submissionRate?.toLocaleString() + '%' || ''}
				loading={loading}
				className="shadow-md  shadow-blue-600"
			/>
			<StatsCard
				title="Submissions Rate"
				icon={<LuView className="text-blue-600" />}
				helpText="Total visits to your forms"
				value={data?.submissionRate?.toLocaleString() + '%' || ''}
				loading={loading}
				className="shadow-md  shadow-blue-600"
			/>
		</div>
	)
}

function StatsCard(props: {
	title: string
	icon: React.ReactNode
	helpText: string
	value: string
	loading: boolean
	className?: string
}) {
	const { title, icon, helpText, value, loading, className } = props
	return (
		<div className={`p-4 bg-white rounded-md ${className}`}>
			<div className="flex items-center">
				<div className="flex-shrink-0">{icon}</div>
				<div className="ml-4">
					<p className="text-sm font-medium text-gray-600">{title}</p>
					<p className="text-lg font-semibold text-gray-800">
						{loading ? '...' : value}
					</p>
				</div>
			</div>
			<p className="mt-4 text-sm text-gray-500">{helpText}</p>
		</div>
	)
}

function FormCardSkeleton() {
	return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />
}

async function FormCards() {
	const forms = await GetForm()
	return (
		<>
			{forms.map((form) => (
				<FormCard key={form.id} form={form} />
			))}
		</>
	)
}

function FormCard({ form }: { form: Form }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 justify-between">
					<span className="truncate font-bold">{form.name}</span>
					{form.published && <Badge>Published</Badge>}
					{!form.published && <Badge variant={'destructive'}>Draft</Badge>}
				</CardTitle>
				<CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
					{formatDistance(form.createdAt, new Date(), {
						addSuffix: true,
					})}
					{form.published && (
						<span className="flex items-center gap-2">
							<LuView className="text-muted-foreground" />
							<span>{form.visits.toLocaleString()}</span>
							<FaWpforms className="text-muted-foreground" />
							<span>{form.submissions.toLocaleString()}</span>
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className="h-[20px] truncate text-sm text-muted-foreground">
				{form.description || 'No description'}
			</CardContent>
			<CardFooter>
				{form.published && (
					<Button asChild className="w-full mt-2 text-md gap-4">
						<Link href={`/forms/${form.id}`}>
							View submissions <BiRightArrowAlt />
						</Link>
					</Button>
				)}
				{!form.published && (
					<Button
						asChild
						variant={'secondary'}
						className="w-full mt-2 text-md gap-4"
					>
						<Link href={`/builder/${form.id}`}>
							Edit form <FaEdit />
						</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}

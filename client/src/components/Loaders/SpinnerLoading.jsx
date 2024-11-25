const SpinnerLoading = ({ bgColor, text }) => {
	return (
		<>
			<div className='flex flex-col items-center text-neutral-500 dark:bg-neutral-900 dark:text-neutral-300'>
				<div className='relative flex flex-col items-center gap-y-4'>
					<div className={`h-6 w-6 ${bgColor ? bgColor : 'bg-neutral-400'} rounded-full`}></div>
					<div
						className={`h-6 w-6 ${
							bgColor ? bgColor : 'bg-neutral-400'
						} absolute left-0 top-0 animate-ping rounded-full`}></div>
					<div
						className={`h-6 w-6 ${
							bgColor ? bgColor : 'bg-neutral-400'
						} absolute left-0 top-0 animate-pulse rounded-full`}></div>
				</div>
				<span className='mt-6 text-sm font-medium'>{text ? text : 'Por favor, espera un momento :)'}</span>
			</div>
		</>
	)
}

export { SpinnerLoading }

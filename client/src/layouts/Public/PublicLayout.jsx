const PublicLayout = ({ children }) => {
	return (
		<>
			<div className='min-h-screen flex flex-col items-center justify-center'>
				<div className='w-full max-w-6xl bg-white p-8'>{children}</div>
			</div>
		</>
	)
}

export { PublicLayout }

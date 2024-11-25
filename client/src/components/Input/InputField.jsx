const InputField = ({ type, value, onChange, name_field, placeholder }) => {
	return (
		<div className='flex flex-col gap-y-1.5 text-slate-600 w-full'>
			<label>{name_field}</label>
			<input
				className='w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm  focus:outline-none focus:border-slate-400 focus:ring-blue-200 focus:ring-2'
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	)
}

export { InputField }

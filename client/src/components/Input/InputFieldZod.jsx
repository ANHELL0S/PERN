import { BiInfoCircle } from 'react-icons/bi'

const InputFieldZod = ({ label, placeholder, type = 'text', register, error }) => (
	<div className='flex flex-col gap-y-1.5 text-neutral-600 w-full text-sm'>
		<div className='flex gap-x-2'>
			<label className={`${error ? 'text-red-500' : ''}`}>{label}</label>
			<span className='text-red-500'>*</span>
		</div>

		<input
			{...register}
			type={type}
			placeholder={placeholder}
			className={`w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 focus:border-neutral-400 focus:outline-none ${error ? 'border-red-500' : ''}`}
		/>

		<div className='text-red-500 text-xs flex items-start gap-1 font-normal'>
			{error && (
				<>
					<BiInfoCircle size={16} /> <p>{error.message}</p>
				</>
			)}
		</div>
	</div>
)

export { InputFieldZod }

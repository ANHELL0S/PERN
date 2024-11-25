import { useState } from 'react'
import { LuX } from 'react-icons/lu'

const SearchInput = ({ onSearch }) => {
	const [query, setQuery] = useState('')

	const handleSearch = e => {
		const newQuery = e.target.value
		setQuery(newQuery)
		onSearch(newQuery.toLowerCase())
	}

	const clearSearch = () => {
		setQuery('')
		onSearch('')
	}

	return (
		<div className='relative w-full md:w-1/2 lg:w-1/3'>
			<input
				type='text'
				value={query}
				onChange={handleSearch}
				placeholder='Buscar productos...'
				className='p-1.5 border rounded-lg w-full outline-none'
			/>
			{query && (
				<button
					onClick={clearSearch}
					className='absolute right-2 p-1.5 hover:bg-slate-100 rounded-full transition-colors duration-200 top-1/2 transform -translate-y-1/2 text-gray-500'
					aria-label='Clear search'>
					<LuX />
				</button>
			)}
		</div>
	)
}

export { SearchInput }

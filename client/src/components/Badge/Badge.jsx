const Badge = ({ text, type = 'success', position = '' }) => {
	const styles = {
		success: 'bg-green-400 text-white',
		error: 'bg-red-400 text-white',
		warning: 'bg-yellow-400 text-slate-700',
		info: 'bg-blue-400 text-white',
		default: 'bg-slate-400 text-white',
	}

	const badgeStyle = styles[type] || styles.default

	return <span className={`${position} ${badgeStyle} text-xs font-medium px-2 py-0.5 rounded`}>{text}</span>
}

export { Badge }

import { BiInfoCircle } from 'react-icons/bi'

const SelectFieldZod = ({
    label,
    name,
    options,
    onChange,
    register,
    error
}) => {
    return (
        <div className="flex flex-col gap-y-1.5 text-slate-600 w-full text-sm">
            <div
                className={`flex gap-x-2 ${error ? 'text-red-500' : 'text-slate-600'}`}
            >
                <label>{label}</label>
                <span>*</span>
            </div>
            <select
                {...register(name)}
                onChange={onChange}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 focus:border-slate-400 focus:outline-none"
            >
                <option value="">Selecciona una opción</option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {error && (
                <div className="text-red-500 text-xs flex items-start gap-1 font-normal">
                    <BiInfoCircle size={16} /> <p>{error.message}</p>
                </div>
            )}
        </div>
    )
}

export { SelectFieldZod }

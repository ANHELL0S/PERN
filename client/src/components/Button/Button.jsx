import { BiLoaderAlt } from 'react-icons/bi'

const Button = ({
    type = 'button',
    variant = 'primary',
    size = 'sm',
    loading = false,
    children,
    onClick
}) => {
    const baseClasses =
        'flex items-center justify-center focus:outline-none transition duration-300 ease-in-out font-medium'
    const variantClasses = {
        primary:
            'bg-neutral-700 border border-transparent dark:bg-neutral-800 text-neutral-50 hover:bg-neutral-600 dark:hover:bg-neutral-700/60 rounded-md',
        none: 'text-neutral-600 hover:bg-neutral-200/60 rounded-md dark:text-neutral-300 dark:hover:bg-neutral-700/50',
        secondary:
            'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-md dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-300',
        outline:
            'border border-neutral-200 text-neutral-600  dark:text-neutral-300 hover:bg-neutral-100 rounded-md dark:border-neutral-700 dark:hover:bg-neutral-800',
        danger: 'bg-red-500 dark:bg-red-800 text-red-50 hover:bg-red-600 dark:hover:bg-red-700/60 rounded-md',
        success: 'bg-green-500 text-green-100 hover:bg-green-600 rounded-md',
        rounded:
            'border border-neutral-300 bg-white rounded-full text-neutral-600 hover:bg-neutral-200'
    }
    const sizeClasses = {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-xs',
        full: 'py-3 w-full text-sm px-4',
        rounded: 'p-3 text-lg'
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={loading}
            onClick={onClick}
        >
            {loading && <BiLoaderAlt className="animate-spin" />}
            {children}
        </button>
    )
}

export { Button }

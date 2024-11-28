import { toast } from 'sonner'

const ToastGeneric = ({ type, message }) => {
    const theme = localStorage.getItem('theme') || 'light'

    let toastConfig = {
        style: {
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            padding: '12px',
            borderRadius: '4px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
        }
    }

    switch (type) {
        case 'success':
            toastConfig.style.color = theme === 'dark' ? '#14b8a6' : '#14b8a6'
            toastConfig.style.background =
                theme === 'dark' ? '#262626' : '#f4fefd'
            toastConfig.style.borderLeft = `5px solid ${theme === 'dark' ? '#14b8a6' : '#14b8a6'}`
            break
        case 'error':
            toastConfig.style.color = theme === 'dark' ? '#fb4934' : '#dc3545'
            toastConfig.style.background =
                theme === 'dark' ? '#262626' : '#fcf2f2'
            toastConfig.style.borderLeft = `6px solid ${theme === 'dark' ? '#fb4934' : '#dc3545'}`
            break
        case 'info':
            toastConfig.style.color = theme === 'dark' ? '#17a2b8' : '#17a2b8'
            toastConfig.style.background =
                theme === 'dark' ? '#262626' : '#edf8fa'
            toastConfig.style.borderLeft = `6px solid ${theme === 'dark' ? '#17a2b8' : '#17a2b8'}`
            break
        case 'warning':
            toastConfig.style.color = theme === 'dark' ? '#fa8520' : '#fa8520'
            toastConfig.style.background =
                theme === 'dark' ? '#262626' : '#f7f3f0'
            toastConfig.style.borderLeft = `6px solid ${theme === 'dark' ? '#fa8520' : '#fa8520'}`
            break
        default:
            toastConfig.style.color = theme === 'dark' ? '#14b8a6' : '#14b8a6'
            toastConfig.style.background =
                theme === 'dark' ? '#262626' : '#f4fefd'
            toastConfig.style.borderLeft = `6px solid ${theme === 'dark' ? '#14b8a6' : '#14b8a6'}`
            break
    }

    toast[type](message, toastConfig)
}

export { ToastGeneric }

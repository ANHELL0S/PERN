import { useState } from 'react'
import { useUserStore } from '../../hooks/useUser'
import { PersonalInfoForm } from '../../components/Form/Account/PersonalInfoForm'
import { PasswordForm } from '../../components/Form/Account/PasswordForm'

const AccountSection = () => {
	const { userStore, loading, error } = useUserStore()
	const [activeSection, setActiveSection] = useState('info')

	const handleTabClick = section => setActiveSection(section)

	if (loading) return <div>Loading...</div>
	if (error) return <div className='text-red-500'>Error: {error}</div>

	const renderSectionContent = section => {
		switch (section) {
			case 'info':
				return (
					<div className='bg-white flex space-x-6'>
						<div className='flex-1 space-y-4'>
							<PersonalInfoForm user={userStore?.data} />
						</div>
					</div>
				)
			case 'security':
				return (
					<div className='bg-white flex space-x-6'>
						<div className='flex-1 space-y-4'>
							<PasswordForm />
						</div>
					</div>
				)
			default:
				return null
		}
	}

	return (
		<div className='space-y-6'>
			<div className='sm:grid sm:grid-cols-3 gap-4'>
				{/* Menú de Pestañas */}
				<div className='text-sm flex sm:items-start sm:flex-col sm:font-medium sm:pt-20 sm:sticky sm:top-20 col-span-1'>
					<div className='flex flex-row sm:flex-col w-full justify-center pt-8 sm:justify-start items-start font-medium'>
						<button
							className={`py-2 px-4 sm:px-0 ${activeSection === 'info' ? 'text-blue-600' : ''}`}
							onClick={() => handleTabClick('info')}>
							Datos personales
						</button>
						<button
							className={`py-2 px-4 sm:px-0 ${activeSection === 'security' ? 'text-blue-600' : ''}`}
							onClick={() => handleTabClick('security')}>
							Seguridad
						</button>
					</div>
				</div>

				{/* Contenido del Formulario */}
				<div className='col-span-2 space-y-8 pt-10'>
					{/* Datos personales */}
					<div id='info' className={`relative ${activeSection !== 'info' && 'hidden'}`}>
						<h3 className='font-semibold text-lg mb-2'>Datos personales</h3>
						<p className='text-sm mb-4'>
							Complete su información personal a continuación para mantener su cuenta actualizada.
						</p>
						{renderSectionContent('info')}
					</div>

					{/* Seguridad */}
					<div id='security' className={`relative ${activeSection !== 'security' && 'hidden'}`}>
						<h3 className='font-semibold text-lg mb-2'>Seguridad</h3>
						<p className='text-sm mb-4'>Administre su contraseña y revise la última vez que se actualizó.</p>
						{renderSectionContent('security')}
					</div>
				</div>
			</div>
		</div>
	)
}

export { AccountSection }

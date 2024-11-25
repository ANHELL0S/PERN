import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import pathimg from '../../assets/images/404_error.svg'
import { DASHBOARD_PATH } from '../../helpers/constants.helper'
import { SEO } from '../../components/SEO/SEO'
import { Button } from '../../components/Button/Button'
import { BiArrowBack } from 'react-icons/bi'

const NotFoundSection = () => {
	const navigate = useNavigate()

	const goBack = () => window.history.back()

	const goToDashboard = () => navigate(DASHBOARD_PATH)

	return (
		<>
			<SEO
				title='Página no encontrada :('
				description='Lo sentimos, la página que estás buscando no se encuentra disponible. Regresa a nuestra página de inicio para explorar nuestros productos desechables.'
				keywords='404, no encontrado'
			/>

			<section className='flex items-center bg-white'>
				<div className='container lg:flex lg:items-center lg:gap-12'>
					<div className='w-full text-neutral-600 lg:w-1/2'>
						<p className='text-md font-bold'>Error 404</p>
						<h1 className='mt-3 text-2xl font-semibold md:text-3xl'>Página no encontrada</h1>

						<p className='mt-4 font-medium text-neutral-500'>
							Lo sentimos, la página que estás buscando no existe. Aquí hay algunos enlaces útiles:
						</p>

						<div className='mt-6 flex items-center gap-x-3'>
							<Button variant='primary' onClick={goToDashboard} size='full'>
								Llevar al inicio
							</Button>

							<Button variant='secondary' onClick={goBack} size='full'>
								<BiArrowBack size={14} className='mr-2' /> Volver atrás
							</Button>
						</div>
					</div>

					<div className='relative mt-12 w-full lg:mt-0 lg:w-1/2'>
						<img className='w-full max-w-lg lg:mx-auto' src={pathimg} alt='' />
					</div>
				</div>
			</section>
		</>
	)
}

export { NotFoundSection }

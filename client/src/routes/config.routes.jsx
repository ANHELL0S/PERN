import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes_auth, routes_privade, routes_public } from './routes.js'
import { SpinnerLoading } from '../components/Loaders/SpinnerLoading.jsx'
import { RedirectIfAuthenticated, RedirectIfNotAuthenticated } from './protected.routes.jsx'

export function RoutesConfig() {
	return (
		<Suspense
			fallback={
				<div className='flex h-screen items-center justify-center'>
					<SpinnerLoading text='Cargando, espera un momento :)' />
				</div>
			}>
			<Routes>
				<Route>
					{routes_auth.map(({ path, element: Element }) => (
						<Route
							key={path}
							path={path}
							element={
								<RedirectIfAuthenticated>
									<Element />
								</RedirectIfAuthenticated>
							}
						/>
					))}

					{routes_public.map(({ path, element: Element }) => (
						<Route key={path} path={path} element={<Element />} />
					))}

					{routes_privade.map(({ path, element: Element }) => (
						<Route
							key={path}
							path={path}
							element={
								<RedirectIfNotAuthenticated>
									<Element />
								</RedirectIfNotAuthenticated>
							}
						/>
					))}
				</Route>
			</Routes>
		</Suspense>
	)
}

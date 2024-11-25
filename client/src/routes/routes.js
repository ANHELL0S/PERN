import { lazy } from 'react'
import {
	ABOUT_PATH,
	LOGIN_PATH,
	ACCOUNT_PATH,
	DASHBOARD_PATH,
	NOT_FOUND_PATH,
	PASSWORD_RESET_PATH,
	RECOVER_ACCOUNT_PATH,
} from '../helpers/constants.helper.js'

const routes_auth = [
	{
		path: LOGIN_PATH,
		element: lazy(() => import('../pages/Auth/LoginPage.jsx')),
	},
	{
		path: PASSWORD_RESET_PATH,
		element: lazy(() => import('../pages/Auth/PasswordResetPage.jsx')),
	},
	{
		path: RECOVER_ACCOUNT_PATH,
		element: lazy(() => import('../pages/Auth/PasswordResetRequestPage.jsx')),
	},
]

const routes_privade = [
	{
		path: DASHBOARD_PATH,
		element: lazy(() => import('../pages/Dashboard/DashboardPage.jsx')),
	},
	{
		path: ACCOUNT_PATH,
		element: lazy(() => import('../pages/Account/AccountPage.jsx')),
	},
]

const routes_public = [
	{
		path: ABOUT_PATH,
		element: lazy(() => import('../pages/About/AboutPage.jsx')),
	},
	{
		path: NOT_FOUND_PATH,
		element: lazy(() => import('../pages/NotFound/NotFoundPage.jsx')),
	},
]

export { routes_public, routes_auth, routes_privade }

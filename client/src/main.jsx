import './index.css'
import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</QueryClientProvider>
)

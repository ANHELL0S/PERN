import chalk from 'chalk'
import morgan from 'morgan'

function setupMorgan(app) {
	morgan.token('colored-status', (req, res) => {
		const status = res.statusCode
		let statusSymbol
		if (status >= 500) {
			statusSymbol = chalk.red(`${status}`)
		} else if (status >= 400) {
			statusSymbol = chalk.yellow(`${status}`)
		} else if (status >= 300) {
			statusSymbol = chalk.cyan(`${status}`)
		} else if (status >= 200) {
			statusSymbol = chalk.green(`${status}`)
		} else {
			statusSymbol = status
		}
		return statusSymbol
	})

	// Configuración de morgan para los logs
	app.use(morgan(':colored-status :method :url :response-time ms'))
}

export { setupMorgan }

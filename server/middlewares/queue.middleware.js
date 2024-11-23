import PQueue from 'p-queue'

const queue = new PQueue({ concurrency: 100 })

const queueMiddleware = (req, res, next) => {
	queue.add(
		() =>
			new Promise((resolve, reject) => {
				next()
				resolve()
			})
	)
}

export { queueMiddleware }

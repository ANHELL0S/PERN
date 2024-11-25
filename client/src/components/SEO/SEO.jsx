import { Helmet } from 'react-helmet'

const SEO = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='robots' content='noindex, follow' />
			<meta name='keywords' content={keywords} />
		</Helmet>
	)
}

export { SEO }

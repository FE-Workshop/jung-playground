/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@jung/ui'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pokeapi.co',
				port: '',
				pathname: '/api/v2/pokemon/**',
			},
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
				port: '',
				pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
			},
		],
	},
};

module.exports = nextConfig;

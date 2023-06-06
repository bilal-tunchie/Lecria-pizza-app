/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    // images: {
    //     domains: ['mponlineassets.s3.me-south-1.amazonaws.com'],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mponlineassets.s3.me-south-1.amazonaws.com',
                port: '',
                pathname: '/ksa/assets/products/**',
            },
        ],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig

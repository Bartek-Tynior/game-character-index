import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/characters/:path*',
                destination: 'http://localhost:8080/api/characters/:path*',
            },
        ];
    },
}

module.exports = nextConfig

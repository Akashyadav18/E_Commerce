/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com"],
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" }, // Allow all origins during development (replace with specific origin for production)
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" }, // Common HTTP methods
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }, // Allow necessary headers for data and authentication
                ],
            },
        ];
    },
};

export default nextConfig;

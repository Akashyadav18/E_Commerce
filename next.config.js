/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com"],
    }
}
module.exports = {
    async headers() {
        return [
            {
                source: "/api/admin/all-products/*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" }, // Adjust for production
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
                ],
            },
        ];
    },
};


module.exports = nextConfig

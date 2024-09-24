/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"uploadthing.com",
			"lh3.googleusercontent.com",
			"utfs.io",
			"garnetod.files.wordpress.com",
			"images.unsplash.com",
			"media.graphassets.com",
			"stay-in-mongolia.s3.ap-northeast-2.amazonaws.com",
			"playmax.mn",
		],
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 31536000,
		deviceSizes: [375, 640, 750, 828, 1080, 1440, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448],
	},
}

export default nextConfig

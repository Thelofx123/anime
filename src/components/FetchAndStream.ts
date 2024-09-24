import axios from "axios"

async function fetchAndStreamVideo(videoURL: any) {
	try {
		const response = await axios({
			method: "get",
			url: videoURL,
			responseType: "arraybuffer", // Ensure you get the data as a binary type
			headers: {
				Referer: "https://playmax.mn/",
			},
		})

		const videoBlob = new Blob([response.data], { type: "video/mp4" }) // Assuming the content is MP4 compatible
		const videoSrc = URL.createObjectURL(videoBlob)

		return videoSrc
	} catch (error) {
		console.error("Error fetching or streaming video:", error)
		return null
	}
}

export default fetchAndStreamVideo

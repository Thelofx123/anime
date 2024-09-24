export const searchAnime = async (value: any) => {
	try {
		const response = await fetch(`https://playmax.mn/api/search?q=${value}`)
		if (!response.ok) {
			throw new Error("Network response was not ok: " + response.statusText)
		}
		const data = await response.json()
		return data
	} catch (error: any) {
		console.error("Failed to fetch data:", error)
		return null
	}
}

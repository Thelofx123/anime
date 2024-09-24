export const getAnime = async (id: any) => {
	try {
		const response = await fetch(`https://playmax.mn/api/m/episode/${id}/1`)

		if (!response.ok) {
			throw new Error("Network response was not ok: " + response.statusText)
		}

		const data = await response.json()

		return data
	} catch (error) {
		console.error("Failed to fetch data:", error)
		return null
	}
}

export const getAnimeList = async (id: any) => {
	try {
		const response = await fetch(`https://playmax.mn/api/m/episodes/${id}/1`)

		if (!response.ok) {
			throw new Error("Network response was not ok: " + response.statusText)
		}

		const data = await response.json()

		return data
	} catch (error) {
		console.error("Failed to fetch data:", error)
		return null
	}
}

export const getMovie = async (id: any) => {
	try {
		const response = await fetch(`https://playmax.mn/api/m/movie/${id}`)

		if (!response.ok) {
			throw new Error("Network response was not ok: " + response.statusText)
		}

		const data = await response.json()

		return data
	} catch (error) {
		console.error("Failed to fetch data:", error)
		return null
	}
}

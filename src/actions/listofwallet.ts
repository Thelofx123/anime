export const getAllListOfWallets = async () => {
	try {
		const response = await fetch(
			"https://playmax.mn/api/m/payment/options/list/0"
		)

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

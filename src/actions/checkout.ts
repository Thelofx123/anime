export const checkout = async (id: any, listId: any) => {
	try {
		const response = await fetch(
			`https://playmax.mn/api/qpay/invoice/${id}/${listId}/wallet`
		)

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

export const checkCheckout = async (id: any) => {
	try {
		const response = await fetch(`https://playmax.mn/api/qpay/check/${id}`)

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

export const buyMonthsFromWallet = async (id: any, type: any) => {
	try {
		const response = await fetch(
			`https://playmax.mn/api/m/wallet/tx/charge/${type}/${id}?type=0`
		)

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

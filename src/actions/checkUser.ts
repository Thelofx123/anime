export const checkUser = async (phone: string) => {
	const url = "https://playmax.mn/api/m/reset/password/phone"
	try {
		const submitData = {
			phone,
			password: "1111",
			password_confirmation: "1111",
		}
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(submitData),
			headers: {
				"content-type": "application/json",
			},
		})

		if (!response.ok) {
			throw new Error("Network response was not ok: " + response.statusText)
		}

		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}

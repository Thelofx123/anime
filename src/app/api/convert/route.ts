import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const ivArray = [9, 15, 19, 24, 32, 43, 44, 46, 48, 49, 59, 64, 71, 83, 87, 93]
const keyArray = [6, 13, 14, 18, 19, 26, 30, 38, 42, 45, 48, 53, 62, 63, 67, 76]

function arrayToBuffer(array: any) {
	return Buffer.from(array)
}

const iv = arrayToBuffer(ivArray)
const key2 = arrayToBuffer(keyArray)

function decrypt(encrypted: any, key: any, iv: any) {
	const decipher = crypto.createDecipheriv("aes-128-ctr", key, iv)
	const decrypted = Buffer.concat([
		decipher.update(encrypted),
		decipher.final(),
	])

	return decrypted.toString("utf8")
}

const toBytes = (t: any) => {
	for (var e = [], n = 0; n < t.length; n += 2)
		e.push(parseInt(t.substr(n, 2), 16))
	return e
}

export async function POST(req: NextRequest, res: NextResponse) {
	const data: any = await req.json()

	try {
		let url = data.subUrl

		let enc = atob(url)

		let splited = enc.split("\n\n")
		let texts = "WEBVTT \n"
		for (let i = 0; i < splited.length; i++) {
			if (splited[i].split("\n")[0] === "WEBVTT") continue
			if (splited[i].split("\n")[1] === undefined) continue
			// console.log(splited[i].split("\n")[1], 'splited[i].split("\n")[1]')
			let key = toBytes(splited[i].split("\n")[1])
			// console.log(key, "key")
			const bufferedH = arrayToBuffer(key)

			const decrypted = decrypt(bufferedH, key2, iv)
			texts =
				texts + "\n" + splited[i].split("\n")[0] + "\n" + decrypted + "\n"
		}

		return new NextResponse(texts.replaceAll("***newline***", " "), {
			status: 200,
		})
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Failed to fetch video" },
			{ status: 500 }
		)
	}
}

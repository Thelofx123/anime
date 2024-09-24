import { ListOfWallet } from "@/components/ListOfWallet"
import { getAllListOfWallets } from "@/actions/listofwallet"

const fetchList = async () => {
	const data = await getAllListOfWallets()
	return data
}

export default async function Index() {
	const data: any = await fetchList()

	return (
		<div className="space-y-6 p-[20px] md:p-[30px] lg:p-[40px]">
			<ListOfWallet data={data || []} />
		</div>
	)
}

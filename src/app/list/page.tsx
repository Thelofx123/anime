import { getAllListOfWallets } from "@/actions/listofwallet";
import { ListOfWallet } from "@/components/ListOfWallet";

const fetchList = async () => {
  const data = await getAllListOfWallets();
  return data;
};

export default async function ListOfPlans() {
  const data: any = await fetchList();

  return (
    <div className="space-y-6 p-[20px] md:p-[30px] lg:p-[40px]">
      <ListOfWallet data={data || []} />
    </div>
  );
}

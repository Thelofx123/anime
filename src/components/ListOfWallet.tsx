"use client";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkout } from "@/actions/checkout";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DrawerDemo } from "./Qpay";

interface ListOfWalletProps {
  className?: string;
  data: any[];
}

interface WalletItem {
  id: string;
  title: string;
  length: number;
  price: number;
}

// Component
export function ListOfWallet({ className, data }: ListOfWalletProps) {
  const [selectedList, setSelectedList] = useState<WalletItem | null>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [qpayData, setQpayData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
  }, []);

  const checkoutGenerate = async (item: WalletItem) => {
    if (!userId) {
      router.push("/login");
      return;
    }

    setSelectedList(item);

    if (!item.id) return;

    try {
      setIsLoading(true);
      const data = await checkout(userId, item.id);
      setQpayData(data?.data);
      setBill(data?.bill);
      setIsLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process checkout. Please try again.");
    }
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4 gap-5 ${className}`}
    >
      {data &&
        data.map((item, index) => (
          <Card
            key={item.id || index}
            className="w-full max-w-[380px] border-[1px] border-[#111]"
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex gap-4 items-center">
                <CheckCircledIcon />
                Анимэ багц
              </div>
              <div className="flex gap-4 items-center">
                <CheckCircledIcon />
                Кино багц
              </div>
              <div className="grid items-start pb-4">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Хоног - {item.length} өдөр
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Үнэ - {item.price}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full border-[1px] border-[#111]"
                variant="default"
                disabled={isLoading}
                onClick={() => checkoutGenerate(item)}
              >
                <p className="text-[#000]">
                  {isLoading ? "Loading..." : "Худалдан авах"}
                </p>
              </Button>
            </CardFooter>
          </Card>
        ))}

      <DrawerDemo
        qpayData={qpayData}
        data={selectedList}
        open={open}
        setOpen={setOpen}
        setQpayData={setQpayData}
        bill={bill}
      />
    </div>
  );
}

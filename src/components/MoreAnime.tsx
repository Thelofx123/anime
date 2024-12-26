"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const MoreAnime = ({ data }: any) => {
  const router = useRouter();

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-[20px] bg-[#161616]">
      {data.map((item: any, index: any) => (
        <>
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => router.push(`/anime/${item?.id}`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px] opacity-100"
                src={"https://playmax.mn/" + item?.image}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item?.title}</b>
              <p className="text-default-500">{item?.number}</p>
            </CardFooter>
          </Card>
        </>
      ))}
    </div>
  );
};

"use client";

import { useCallback, useState, useTransition } from "react";
import { SearchBar } from "./SearchBar";

import { AnimeSingle } from "./AnimeSingle";
import { PlaceholdersAndVanishInput } from "./PLaceholder";
import { searchAnime } from "@/actions/search";

export const HomePage: any = () => {
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [value, setValue] = useState("");
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const [isPending, startTransition] = useTransition();

  const debounce = (func: any, delay: any) => {
    let inDebounce: any;
    return (...args: any) => {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func(...args), delay);
    };
  };

  const searchOrder = (e: any) => {
    startTransition(() => {
      searchAnime(e)
        .then((data: any) => {
          setPaginatedData(data);
        })
        .catch((err: any) => {
          console.log(err, "error");
        });
    });
  };

  const debouncedHandleSearch = useCallback(debounce(searchOrder, 1500), []);

  return (
    <div className="scrollbar-hide">
      <div className=" flex flex-col justify-center z-[100] items-center px-4 sticky top-[20px]">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          value={value}
          setValue={setValue}
          isPending={isPending}
          onChange={(e: any) => {
            debouncedHandleSearch(e.target.value);
          }}
          onSubmit={(e: any) => {
            searchOrder(e.target.value);
          }}
        />
      </div>

      <div className="px-[30px] items-center max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 w-full h-full pt-[50px] pb-[40px] scrollbar-hide">
        {paginatedData.length > 0 &&
          paginatedData.map((data: any) => (
            <div className="group hover:scale-105 transition-transform duration-300 ease-in-out">
              <AnimeSingle key={data.id} data={data} />
            </div>
          ))}
      </div>
    </div>
  );
};

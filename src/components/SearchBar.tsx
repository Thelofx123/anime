"use client";

import { useCallback, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { searchAnime } from "@/actions/search";

export const SearchBar = ({
  setPaginatedData,
  inputValue,
  setInputValue,
}: any) => {
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

  const debouncedHandleSearch = useCallback(debounce(searchOrder, 700), []);

  return (
    <div className="w-full h-full flex items-center justify-center sticky top-10 z-[200]">
      <div className="flex items-center justify-between gap-[10px] w-[80%] pt-10">
        <div className="flex flex-1 items-center space-x-2 gap-[10px] border-[#636363]  border-[1px] w-full h-[50px] rounded-3xl pl-[18px] bg-[#121212] z-20">
          <Input
            placeholder="Хайх..."
            value={inputValue}
            onChange={(e) => {
              console.log(e.target.value, "e");
              debouncedHandleSearch(e.target.value),
                setInputValue(e.target.value);
            }}
            className=""
          />
          {isPending && (
            <div>
              <Loader2 className="animate-spin bg-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Index() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-20">
      <Button variant="outline" className="">
        <Link href={"/search"}>Watch Anime</Link>
      </Button>
      <Link
        href={localStorage?.getItem("userId") ? "/list" : "/login"}
        passHref
      >
        <Button variant="outline" className="">
          Account Page
        </Button>
      </Link>
    </div>
  );
}

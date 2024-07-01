"use client";

import { CiSearch } from "react-icons/ci";

export default function Search() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="What service are you looking for today?"
        className="border-b-[1px] border-[black] min-w-[400px] pl-1 pr-0 pt-0 pb-1 focus:outline-none"
      />
      <CiSearch className="absolute right-[10px] top-[50%] translate-y-[-80%] cursor-pointer" />
    </div>
  );
}

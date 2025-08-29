import { Search } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;
    router.push(`/products?page=1&q=${value}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="hidden md:block w-64">
      <div className="relative">
        <Search
          className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
        <Input
          placeholder="Search for products, brands and more"
          className="pl-10 text-sm rounded-sm border-gray-300"
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Searchbar;

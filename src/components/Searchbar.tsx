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
    <div className="w-full">
      <div className="relative">
        <Search
          className="absolute left-3 top-2.5 h-4 w-4 text-nexa-dark/50 cursor-pointer"
          onClick={handleSearch}
        />
        <Input
          placeholder="Q Search for products..."
          className="pl-10 text-sm rounded-lg border-nexa-surface/50 focus:border-nexa-accent bg-nexa-background/50"
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Searchbar;

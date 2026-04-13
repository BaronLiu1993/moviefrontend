"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex py-6 w-fit">
      <Input
        placeholder="Search Anything!"
        className="font-figtree font-medium text-xl rounded-lg bg-gray-100 p-6 placeholder:text-lg placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(value.trim());
          }
        }}
      />
    </div>
  );
};

export default SearchBar;

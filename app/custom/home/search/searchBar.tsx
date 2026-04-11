"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex p-6 items-center w-full">
      <Input
        placeholder="🔍 Search for Asian movies or TV shows..."
        className="font-figtree font-medium text-xl rounded-lg bg-gray-100 p-6 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mx-6"
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

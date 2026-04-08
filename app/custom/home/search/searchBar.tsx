import { Input } from "@/components/ui/input";

const SearchBar: React.FC = () => {
  return (
    <div className="flex p-6 items-center w-full">
      <Input placeholder="Search for Asian movies or TV shows..." className="font-figtree font-medium text-xl rounded-lg bg-gray-100 p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-6" />
    </div>
  );
};

export default SearchBar;

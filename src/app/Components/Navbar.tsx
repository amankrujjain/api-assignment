import { useState, useCallback } from 'react';
import Link from 'next/link';
import { debounce } from 'lodash';

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <Link href="/">
        Assignment
      </Link>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name"
        className="p-2 rounded-md text-black"
      />
    </div>
  );
}

export default Navbar;


import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, School, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchResultType, searchEntities } from '@/utils/searchUtils';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [isActive, setIsActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const searchResults = searchEntities(searchQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (result: SearchResultType) => {
    setSearchQuery(result.name);
    setIsActive(false);
    if (onSearch) {
      onSearch(result.name);
    }
  };

  return (
    <div 
      ref={searchContainerRef}
      className={cn(
        "relative w-full max-w-3xl mx-auto transition-all duration-300",
        className
      )}
    >
      <div 
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "bg-white rounded-full shadow-lg border border-gray-100",
          isActive ? "shadow-xl scale-105" : "hover:shadow-md hover:scale-[1.01]"
        )}
      >
        <div className="flex items-center px-6 py-4">
          <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for colleges, companies, or locations..."
            className="flex-1 text-gray-700 outline-none bg-transparent text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsActive(true)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className={cn(
              "ml-4 px-5 py-2 rounded-full text-white font-medium flex-shrink-0 transition-all",
              "bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50",
              "transform active:scale-95"
            )}
          >
            Find
          </button>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isActive && results.length > 0 && (
        <div className="absolute inset-x-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10 animate-fade-in-down">
          <div className="max-h-80 overflow-y-auto py-2">
            {results.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex items-center">
                  {result.type === 'college' ? (
                    <School className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  ) : (
                    <Building className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{result.name}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">{result.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { applyFilterUpdates, buildSearchParams, parseFiltersFromParams } from '@/utils/queryParams';
import { useDebounce } from '@/hooks/useDebounce';

const Header = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const filters = useMemo(
    () => parseFiltersFromParams(searchParams),
    [searchParams],
  );
  const [searchValue, setSearchValue] = useState(filters.search ?? '');
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    setSearchValue(filters.search ?? '');
  }, [filters.search]);

  useEffect(() => {
    const currentSearch = filters.search ?? '';
    if (debouncedSearch === currentSearch) {
      return;
    }
    const nextFilters = applyFilterUpdates(filters, {
      search: debouncedSearch || undefined,
      page: 1,
    });
    const params = buildSearchParams(nextFilters);
    navigate({ pathname: '/', search: params.toString() });
  }, [debouncedSearch, filters, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-brand-primary">
          Restaurant Explorer
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-brand-primary sm:w-96"
        >
          <svg
            className="mr-2 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18 18-4.35-4.35M15 8.5A6.5 6.5 0 1 1 2 8.5a6.5 6.5 0 0 1 13 0Z"
            />
          </svg>
          <label className="sr-only" htmlFor="search-restaurants">
            Search restaurants
          </label>
          <input
            id="search-restaurants"
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by name, cuisine or tag"
            className="w-full bg-transparent text-sm outline-none"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;


import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '@/components/FilterPanel';
import RestaurantCard from '@/components/RestaurantCard';
import RestaurantSkeleton from '@/components/RestaurantSkeleton';
import Pagination from '@/components/Pagination';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useFavorites } from '@/hooks/useFavorites';
import type { RestaurantFilters } from '@/types';
import {
  applyFilterUpdates,
  buildSearchParams,
  getDefaultFilters,
  parseFiltersFromParams,
} from '@/utils/queryParams';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Loader2 } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';

const ListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const filters = useMemo(() => parseFiltersFromParams(searchParams), [searchParams]);

  const { data, isLoading, isError, error } = useRestaurants(filters);

  const handleFilterChange = (newFilters: Partial<RestaurantFilters>) => {
    const updatedParams = applyFilterUpdates(filters, newFilters);
    const newSearchParams = buildSearchParams(updatedParams);
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (page: number) => {
    handleFilterChange({ ...filters, page });
  };

  const handleClearFilters = () => {
    const defaultFilters = getDefaultFilters();
    const newSearchParams = buildSearchParams(defaultFilters);
    setSearchParams(newSearchParams);
  };

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-24">
            <FilterPanel filters={filters} onChange={handleFilterChange} onReset={handleClearFilters} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {isError ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center">
              <Typography variant="h4" className="text-red-800">
                Oops! Something went wrong.
              </Typography>
              <Typography className="mt-2 text-red-600">
                {error instanceof Error ? error.message : 'Failed to load restaurants.'}
              </Typography>
              <Button
                variant="outline"
                className="mt-4 border-red-200 text-red-700 hover:bg-red-100"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h2">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin" /> Loading...
                    </span>
                  ) : (
                    `Restaurants`
                  )}
                </Typography>
                {!isLoading && data && (
                  <Typography variant="muted">
                    Showing {data.items.length} results
                  </Typography>
                )}
              </div>

              {/* Restaurant Grid */}
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <RestaurantSkeleton key={i} />
                    ))
                  : data?.items.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                        isFavorite={isFavorite(restaurant._id)}
                        onFavoriteToggle={() => toggleFavorite(restaurant._id)}
                      />
                    ))}
              </div>

              {/* Empty State */}
              {!isLoading && data?.items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Loader2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Typography variant="h3">No restaurants found</Typography>
                  <Typography variant="muted" className="mt-2 max-w-md">
                    We couldn't find any restaurants matching your filters. Try adjusting your search or clearing filters.
                  </Typography>
                  <Button onClick={handleClearFilters} className="mt-6">
                    Clear all filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {!isLoading && data && data.pagination.pages > 1 && (
                <div className="mt-8">
                  <Pagination
                    page={data.pagination.page}
                    pages={data.pagination.pages}
                    total={data.pagination.total}
                    onChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default ListingPage;

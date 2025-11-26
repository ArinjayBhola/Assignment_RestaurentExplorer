import { CUISINE_OPTIONS, RATING_OPTIONS, COST_LIMITS } from '@/config';
import type { RestaurantFilters } from '@/types/restaurant';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface FilterPanelProps {
  filters: RestaurantFilters;
  onChange: (filters: Partial<RestaurantFilters>) => void;
  onReset: () => void;
}

const FilterPanel = ({ filters, onChange, onReset }: FilterPanelProps) => {
  const handleCuisineToggle = (cuisine: string) => {
    const exists = filters.cuisine.includes(cuisine);
    const next = exists
      ? filters.cuisine.filter((item) => item !== cuisine)
      : [...filters.cuisine, cuisine];
    onChange({ cuisine: next, page: 1 });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ rating: filters.rating === rating ? undefined : rating, page: 1 });
  };

  const handleCostChange = (key: 'costMin' | 'costMax', value: number | undefined) => {
    onChange({ [key]: value, page: 1 } as Partial<RestaurantFilters>);
  };

  return (
    <Card className="h-fit sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button
          variant="link"
          className="h-auto p-0 text-primary"
          onClick={onReset}
        >
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Filter */}
        <div className="space-y-3">
          <Label className="text-base">Rating</Label>
          <div className="flex flex-wrap gap-2">
            {RATING_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={filters.rating === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleRatingChange(option.value)}
                className="rounded-full"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Cuisine Filter */}
        <div className="space-y-3">
          <Label className="text-base">Cuisines</Label>
          <div className="grid grid-cols-1 gap-2">
            {CUISINE_OPTIONS.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox
                  id={`cuisine-${cuisine}`}
                  checked={filters.cuisine.includes(cuisine)}
                  onCheckedChange={() => handleCuisineToggle(cuisine)}
                />
                <Label
                  htmlFor={`cuisine-${cuisine}`}
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {cuisine}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Cost Filter */}
        <div className="space-y-3">
          <Label className="text-base">Cost for two</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Min (₹)</Label>
              <Input
                type="number"
                min={COST_LIMITS.min}
                value={filters.costMin ?? ''}
                onChange={(e) =>
                  handleCostChange(
                    'costMin',
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Max (₹)</Label>
              <Input
                type="number"
                min={filters.costMin ?? COST_LIMITS.min}
                max={COST_LIMITS.max}
                value={filters.costMax ?? ''}
                onChange={(e) =>
                  handleCostChange(
                    'costMax',
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;


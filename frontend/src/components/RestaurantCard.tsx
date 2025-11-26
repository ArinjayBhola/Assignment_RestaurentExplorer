import { Link } from 'react-router-dom';
import type { Restaurant } from '@/types/restaurant';
import { formatCurrency, formatRating } from '@/utils/format';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

const RestaurantCard = ({
  restaurant,
  isFavorite = false,
  onFavoriteToggle,
}: RestaurantCardProps) => (
  <Card className="group overflow-hidden transition-all hover:shadow-lg">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute left-4 top-4">
        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
          <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
          {formatRating(restaurant.rating)}
        </Badge>
      </div>
      {onFavoriteToggle && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background/100"
          onClick={() => onFavoriteToggle(restaurant._id)}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
            )}
          />
          <span className="sr-only">
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </span>
        </Button>
      )}
    </div>
    
    <CardHeader className="p-4 pb-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold leading-none tracking-tight line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
            {restaurant.cuisines.join(', ')}
          </p>
        </div>
      </div>
    </CardHeader>
    
    <CardContent className="p-4 pt-0">
      <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
        {restaurant.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {restaurant.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-[10px] font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </CardContent>

    <CardFooter className="flex items-center justify-between border-t p-4">
      <div className="text-sm font-medium">
        {formatCurrency(restaurant.averageCostForTwo)} <span className="text-muted-foreground font-normal">for two</span>
      </div>
      <Button asChild size="sm">
        <Link to={`/restaurants/${restaurant._id}`}>
          View Details
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default RestaurantCard;


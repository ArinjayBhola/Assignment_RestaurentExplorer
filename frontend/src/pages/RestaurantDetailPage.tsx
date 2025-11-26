import { useParams } from 'react-router-dom';
import { useRestaurantById } from '@/hooks/useRestaurantById';
import { useFavorites } from '@/hooks/useFavorites';
import { formatCurrency, formatRating } from '@/utils/format';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { Heart, MapPin, Clock, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/layout/PageTransition';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRestaurantById(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <Typography variant="h2" className="text-destructive">!</Typography>
        </div>
        <Typography variant="h3" className="mt-4">Restaurant not found</Typography>
        <Typography variant="muted" className="mt-2 max-w-md">
          {error?.message ?? 'Unable to load restaurant details.'}
        </Typography>
        <Button variant="outline" className="mt-6" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <PageTransition className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl md:h-[400px]">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white md:p-10">
          <Badge className="mb-2 bg-primary text-primary-foreground hover:bg-primary/90">
            {data.cuisines[0]}
          </Badge>
          <h1 className="text-3xl font-bold md:text-5xl">{data.name}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.location.city}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Open Now
            </div>
            <div className="flex items-center gap-1 font-semibold text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              {formatRating(data.rating)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant={isFavorite(data._id) ? "default" : "outline"}
                size="icon"
                onClick={() => toggleFavorite(data._id)}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isFavorite(data._id) ? "fill-red-500 text-red-500" : ""
                  )}
                />
              </Button>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="menu" className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {data.menu.map((item) => (
                  <Card key={item.name}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <span className="font-semibold">{formatCurrency(item.price)}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "mt-2",
                          item.isVegetarian
                            ? "border-green-200 text-green-700 bg-green-50"
                            : "border-red-200 text-red-700 bg-red-50"
                        )}
                      >
                        {item.isVegetarian ? "Veg" : "Non-Veg"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {data.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {data.description}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                     <div>
                        <h4 className="font-semibold">Address</h4>
                        <p className="text-sm text-muted-foreground">{data.location.address}</p>
                     </div>
                     <div>
                        <h4 className="font-semibold">Average Cost</h4>
                        <p className="text-sm text-muted-foreground">{formatCurrency(data.averageCostForTwo)} for two people (approx.)</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
               <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                     Reviews coming soon...
                  </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Online</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <Button className="w-full" size="lg">Order Now</Button>
               <p className="text-xs text-center text-muted-foreground">
                  Min. Order {formatCurrency(200)} • 30-45 min delivery
               </p>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
                <CardTitle>Location</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="aspect-video w-full rounded-md bg-muted/50 flex items-center justify-center text-muted-foreground text-sm">
                   Map Placeholder
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default RestaurantDetailPage;


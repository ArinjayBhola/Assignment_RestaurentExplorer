import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Mail } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAuth } from "@/context/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <PageTransition className="space-y-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <Card className="w-full md:w-[300px]">
          <CardContent className="flex flex-col items-center pt-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Typography variant="h3" className="mt-4">{user?.name}</Typography>
            <Typography variant="muted">{user?.role === 'admin' ? 'Administrator' : 'Foodie & Explorer'}</Typography>
            
            <div className="mt-6 w-full space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user?.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {user?.location || 'Location not set'}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Joined Jan 2024
              </div>
            </div>

            <Button className="mt-6 w-full" variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4 text-center">
                <Typography variant="h2">12</Typography>
                <Typography variant="muted" className="text-sm">Reviews</Typography>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Typography variant="h2">45</Typography>
                <Typography variant="muted" className="text-sm">Photos</Typography>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Typography variant="h2">8</Typography>
                <Typography variant="muted" className="text-sm">Favorites</Typography>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="reviews">
            <TabsList>
              <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="mt-4 space-y-4">
              {/* Placeholder for reviews */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <Typography variant="h4" className="text-base">The Burger Joint</Typography>
                    <Badge variant="secondary">4.5 ★</Badge>
                  </div>
                  <Typography variant="muted" className="mt-2 text-sm">
                    "Amazing burgers! The best I've had in a while."
                  </Typography>
                  <Typography variant="small" className="mt-4 text-muted-foreground">2 days ago</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <Typography variant="h4" className="text-base">Pasta Paradise</Typography>
                    <Badge variant="secondary">5.0 ★</Badge>
                  </div>
                  <Typography variant="muted" className="mt-2 text-sm">
                    "Authentic Italian taste. Highly recommended."
                  </Typography>
                  <Typography variant="small" className="mt-4 text-muted-foreground">1 week ago</Typography>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="favorites" className="mt-4">
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No favorites yet.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}

export default ProfilePage;

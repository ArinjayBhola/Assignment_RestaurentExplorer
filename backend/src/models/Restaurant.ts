import mongoose, { Schema, Document } from 'mongoose';

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  isVegetarian: boolean;
}

export interface RestaurantDocument extends Document {
  name: string;
  description: string;
  cuisines: string[];
  tags: string[];
  rating: number;
  averageCostForTwo: number;
  imageUrl: string;
  menu: MenuItem[];
  location: {
    address: string;
    city: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<MenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isVegetarian: { type: Boolean, default: false },
  },
  { _id: false },
);

const restaurantSchema = new Schema<RestaurantDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    cuisines: [{ type: String, index: true }],
    tags: [{ type: String }],
    rating: { type: Number, required: true, min: 1, max: 5, index: true },
    averageCostForTwo: { type: Number, required: true, index: true },
    imageUrl: { type: String, required: true },
    menu: [menuItemSchema],
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true, index: true },
    },
  },
  {
    timestamps: true,
  },
);

restaurantSchema.index({ name: 'text', description: 'text', tags: 'text' });

const RestaurantModel =
  (mongoose.models.Restaurant as mongoose.Model<RestaurantDocument>) ||
  mongoose.model<RestaurantDocument>('Restaurant', restaurantSchema);

export const Restaurant = RestaurantModel;

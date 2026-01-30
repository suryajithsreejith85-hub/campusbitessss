
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Breakfast' | 'Lunch' | 'Snacks' | 'Drinks';
  image: string;
  isVegetarian: boolean;
  rating: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  balance: number;
}

export enum AppRoute {
  LOGIN = '/login',
  DASHBOARD = '/',
  ORDER_HISTORY = '/orders'
}


import { FoodItem } from './types';

export const MENU_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Paneer Butter Masala',
    description: 'Creamy paneer cubes cooked in rich tomato gravy with traditional spices.',
    price: 180,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&h=300',
    isVegetarian: true,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Cheese Grilled Sandwich',
    description: 'Triple layered sandwich loaded with mozzarella and seasonal veggies.',
    price: 85,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&h=300',
    isVegetarian: true,
    rating: 4.2
  },
  {
    id: '3',
    name: 'Classic Cold Coffee',
    description: 'Refreshing blended coffee with a scoop of vanilla ice cream.',
    price: 60,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=400&h=300',
    isVegetarian: true,
    rating: 4.8
  },
  {
    id: '4',
    name: 'Spicy Veg Maggi',
    description: 'The ultimate college snack with extra spice and sautéed vegetables.',
    price: 45,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=400&h=300',
    isVegetarian: true,
    rating: 4.9
  },
  {
    id: '5',
    name: 'Aloo Paratha (2pcs)',
    description: 'Homestyle wheat parathas stuffed with mashed potato and served with curd.',
    price: 70,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=400&h=300',
    isVegetarian: true,
    rating: 4.3
  },
  {
    id: '6',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices.',
    price: 220,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1563379091339-03b11adbbee1?auto=format&fit=crop&w=400&h=300',
    isVegetarian: false,
    rating: 4.7
  }
];

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';
  searchQuery: string;
}

export interface AppState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
}
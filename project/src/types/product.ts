export interface Product {
  id: string;
  name: string;
  artist: string;
  description: string;
  price: number;
  sizes: {
    name: string;
    dimensions: string;
    price: number;
  }[];
  categories: string[];
  tags: string[];
  images: string[];
  stock: number;
  featured: boolean;
  createdAt: string;
}
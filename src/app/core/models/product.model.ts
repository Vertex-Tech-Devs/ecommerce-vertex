export interface ProductVariant {
  id: string;
  productId: string;
  sku?: string;
  attributes: { [key: string]: string };
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  image: string;
  images?: string[];
  createdAt: Date;
  
  totalStock: number;
  inStockAttributes: { [key: string]: string[] };
  variantAttributes: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
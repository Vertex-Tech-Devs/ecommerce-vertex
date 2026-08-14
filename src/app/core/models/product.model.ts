export interface ProductVariant {
  id: string;
  productId: string;
  sku?: string;
  price?: number;
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

  stock?: number;
  totalStock: number;
  inStockAttributes: { [key: string]: string[] };
  variantAttributes: string[];
}

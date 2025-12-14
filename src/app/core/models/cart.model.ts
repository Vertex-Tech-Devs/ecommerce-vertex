export interface ICartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  attributes: { [key: string]: string };
  stock: number;
}

export interface ICart {
  items: ICartItem[];
  total: number;
}

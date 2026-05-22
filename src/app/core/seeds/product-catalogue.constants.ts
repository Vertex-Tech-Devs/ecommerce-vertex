export interface CatalogueItem {
  name: string;
  featured: boolean;
  price: number;
  discount: number;
  desc: string;
  imgs: string[];
}

export interface CatalogueCategory {
  slug: string;
  variants: string[];
  items: CatalogueItem[];
}

import { PRODUCT_CATALOGUE } from './data/catalogue-items';

export { PRODUCT_CATALOGUE };

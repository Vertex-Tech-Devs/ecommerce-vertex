import { z } from 'zod';

export const ProductVariantSchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(),
  storeId: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().optional(),
  attributes: z.record(z.string(), z.string()).default({}),
  stock: z.number().min(0),
  image: z.string().url().nullable().optional(),
});

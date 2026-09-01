import { z } from 'zod';
import {
  StoreConfigSchema,
  HeaderFontPresetSchema,
  HeaderAppearanceConfigSchema,
  StoreAppearanceConfigSchema,
} from './store.schema';
import { FooterConfigSchema } from './footer.schema';

export {
  StoreConfigSchema,
  HeaderFontPresetSchema,
  HeaderAppearanceConfigSchema,
  StoreAppearanceConfigSchema,
} from './store.schema';
export { FooterConfigSchema } from './footer.schema';

export type HeaderFontPreset = z.infer<typeof HeaderFontPresetSchema>;
export type HeaderAppearanceConfig = z.infer<typeof HeaderAppearanceConfigSchema>;
export type StoreAppearanceConfig = z.infer<typeof StoreAppearanceConfigSchema>;
export type StoreConfig = z.infer<typeof StoreConfigSchema>;
export type FooterConfig = z.infer<typeof FooterConfigSchema>;


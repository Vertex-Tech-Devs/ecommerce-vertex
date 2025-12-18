"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantSchema = void 0;
const zod_1 = require("zod");
exports.ProductVariantSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    productId: zod_1.z.string(),
    sku: zod_1.z.string().optional(),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.string()),
    stock: zod_1.z.number().min(0),
    image: zod_1.z.string().url().nullable().optional(),
});
//# sourceMappingURL=product.model.js.map
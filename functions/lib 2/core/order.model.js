"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.OrderItemSchema = void 0;
const zod_1 = require("zod");
exports.OrderItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    variantId: zod_1.z.string(),
    productName: zod_1.z.string(),
    quantity: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
    productImage: zod_1.z.string().optional(),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.string()),
});
exports.OrderSchema = zod_1.z.object({
    clientName: zod_1.z.string().min(1, "El nombre del cliente es requerido."),
    clientEmail: zod_1.z.string().email("El email del cliente no es válido."),
    clientPhone: zod_1.z.string().min(8, "El teléfono del cliente es requerido."),
    items: zod_1.z.array(exports.OrderItemSchema).min(1, "El pedido debe contener al menos un ítem."),
    total: zod_1.z.number(),
    status: zod_1.z.string(),
});
//# sourceMappingURL=order.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRequestSchema = void 0;
const zod_1 = require("zod");
exports.PaymentRequestSchema = zod_1.z.object({
    external_reference: zod_1.z.string().min(1, "La referencia externa (orderId) es requerida."),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1),
        variantId: zod_1.z.string().min(1),
        title: zod_1.z.string(),
        quantity: zod_1.z.number().positive(),
        unit_price: zod_1.z.number().positive(),
    })).min(1, "La solicitud debe incluir al menos un producto."),
});
//# sourceMappingURL=payment.model.js.map
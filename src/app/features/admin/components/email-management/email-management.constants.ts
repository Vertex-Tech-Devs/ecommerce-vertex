export const DEFAULT_ADMIN_SUBJECT = '¡Nuevo Pedido Recibido! - #{orderId}';
export const DEFAULT_ADMIN_TEMPLATE = `
  <p style="margin:0 0 18px;font-size:16px;">¡Hola Administrador! 👋</p>
  <p style="margin:0 0 20px;color:#475569;">Recibimos un nuevo pedido en tu tienda. Resumen a continuación:</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:22px;">
    <tr>
      <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px 0 0 10px;padding:14px 16px;font-size:13px;color:#64748b;">Pedido</td>
      <td style="background:#fff;border:1px solid #e2e8f0;border-left:none;border-radius:0 10px 10px 0;padding:14px 16px;font-weight:700;color:#0f172a;">#{orderId}</td>
    </tr>
    <tr>
      <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px 0 0 10px;padding:14px 16px;font-size:13px;color:#64748b;">Cliente</td>
      <td style="background:#fff;border:1px solid #e2e8f0;border-left:none;border-radius:0 10px 10px 0;padding:14px 16px;color:#0f172a;">{clientName}<br/><span style="color:#64748b;font-size:13px;">{clientEmail} · {clientPhone}</span></td>
    </tr>
  </table>
  <h4 style="margin:0 0 10px;font-size:14px;color:#334155;text-transform:uppercase;letter-spacing:0.5px;">Productos del Pedido</h4>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:20px;">
    {itemsList}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:4px;">
    <tr>
      <td style="padding:12px 0;font-size:15px;font-weight:700;color:#0f172a;border-top:2px solid #e2e8f0;">Total</td>
      <td style="padding:12px 0;text-align:right;font-size:18px;font-weight:800;color:#4f46e5;border-top:2px solid #e2e8f0;">${'{totalAmount}'}</td>
    </tr>
  </table>
  {deliverySection}
  <p style="margin:18px 0 0;color:#475569;font-size:14px;">Podés ver los detalles completos y gestionar el pedido desde el panel de administración.</p>
`;

export const DEFAULT_CUSTOMER_SUBJECT = 'Confirmación de tu pedido #{orderId}';
export const DEFAULT_CUSTOMER_TEMPLATE = `
  <p style="margin:0 0 18px;font-size:16px;">¡Hola, {clientName}! 🛍️</p>
  <p style="margin:0 0 20px;color:#475569;">¡Gracias por tu compra! Hemos recibido tu pedido <strong>#{orderId}</strong> y ya lo estamos preparando.</p>
  <h4 style="margin:0 0 10px;font-size:14px;color:#334155;text-transform:uppercase;letter-spacing:0.5px;">Resumen de tu Compra</h4>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:20px;">
    {itemsList}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:4px;">
    <tr>
      <td style="padding:12px 0;font-size:15px;font-weight:700;color:#0f172a;border-top:2px solid #e2e8f0;">Total Pagado</td>
      <td style="padding:12px 0;text-align:right;font-size:18px;font-weight:800;color:#4f46e5;border-top:2px solid #e2e8f0;">${'{totalAmount}'}</td>
    </tr>
  </table>
  {deliverySection}
  <p style="margin:18px 0 0;color:#475569;font-size:14px;">Recibirás otra notificación cuando tu pedido sea enviado. Si tenés alguna duda, escribinos.</p>
`;

export const DEFAULT_ADMIN_SUBJECT = '¡Nueva venta recibida! - Pedido #{orderId}';
export const DEFAULT_ADMIN_TEMPLATE = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;">
  <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">¡Hola Administrador! 👋</p>
  <p style="margin:0 0 20px;color:#475569;font-size:14px;">Se ha registrado una nueva compra en tu tienda online. A continuación tenés el resumen detallado para procesar el pedido:</p>

  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:24px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding-bottom:12px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Estado</td>
        <td style="padding-bottom:12px;text-align:right;">
          <span style="background:#dcfce7;color:#15803d;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;display:inline-block;">✓ PAGO ACREDITADO</span>
        </td>
      </tr>
      <tr>
        <td style="border-top:1px solid #e2e8f0;padding:10px 0 6px;font-size:13px;color:#64748b;">Nº de Pedido</td>
        <td style="border-top:1px solid #e2e8f0;padding:10px 0 6px;text-align:right;font-size:14px;font-weight:700;color:#0f172a;font-family:monospace;">#{orderId}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#64748b;">Cliente</td>
        <td style="padding:6px 0;text-align:right;font-size:14px;font-weight:600;color:#0f172a;">{clientName}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#64748b;">Email</td>
        <td style="padding:6px 0;text-align:right;font-size:13px;color:#0f172a;"><a href="mailto:{clientEmail}" style="color:#4f46e5;text-decoration:none;">{clientEmail}</a></td>
      </tr>
      <tr>
        <td style="padding:6px 0 0;font-size:13px;color:#64748b;">Teléfono / WhatsApp</td>
        <td style="padding:6px 0 0;text-align:right;font-size:13px;color:#0f172a;">{clientPhone}</td>
      </tr>
    </table>
  </div>

  <h4 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Artículos Solicitados</h4>
  <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:16px 20px;margin-bottom:20px;">
    {itemsList}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:14px;border-top:2px solid #e2e8f0;">
      <tr>
        <td style="padding-top:14px;font-size:15px;font-weight:700;color:#0f172a;">Total Venta</td>
        <td style="padding-top:14px;text-align:right;font-size:20px;font-weight:800;color:#4f46e5;">\${totalAmount}</td>
      </tr>
    </table>
  </div>

  <h4 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Detalle de Entrega</h4>
  {deliverySection}

  <p style="margin:20px 0 0;color:#64748b;font-size:13px;line-height:1.5;">
    💡 <em>Recordá preparar el pedido y despacharlo o notificar al cliente cuando esté listo.</em>
  </p>
</div>
`;

export const DEFAULT_CUSTOMER_SUBJECT = '¡Confirmación de tu pedido #{orderId}!';
export const DEFAULT_CUSTOMER_TEMPLATE = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;">
  <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:#0f172a;">¡Hola, {clientName}! 👋</p>
  <p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.6;">
    ¡Muchas gracias por tu compra! Tu pago ha sido aprobado correctamente y tu pedido <strong>#{orderId}</strong> ya está siendo preparado con dedicación.
  </p>

  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;margin-bottom:24px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td width="33%" style="text-align:center;padding:4px;">
          <div style="font-size:16px;margin-bottom:4px;">✅</div>
          <div style="font-size:11px;font-weight:700;color:#15803d;">1. Acreditado</div>
        </td>
        <td width="34%" style="text-align:center;padding:4px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
          <div style="font-size:16px;margin-bottom:4px;">📦</div>
          <div style="font-size:11px;font-weight:700;color:#4f46e5;">2. En Preparación</div>
        </td>
        <td width="33%" style="text-align:center;padding:4px;">
          <div style="font-size:16px;margin-bottom:4px;">🚚</div>
          <div style="font-size:11px;font-weight:600;color:#64748b;">3. Listo / Envío</div>
        </td>
      </tr>
    </table>
  </div>

  <h4 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Resumen de tu Compra</h4>
  <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:16px 20px;margin-bottom:20px;">
    {itemsList}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:14px;border-top:2px solid #e2e8f0;">
      <tr>
        <td style="padding-top:14px;font-size:15px;font-weight:700;color:#0f172a;">Total Pagado</td>
        <td style="padding-top:14px;text-align:right;font-size:20px;font-weight:800;color:#4f46e5;">\${totalAmount}</td>
      </tr>
    </table>
  </div>

  <h4 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Información de Entrega</h4>
  {deliverySection}

  <div style="background:#f8fafc;border-radius:12px;padding:14px 16px;margin-top:22px;border-left:4px solid #4f46e5;">
    <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">
      💬 <strong>¿Tenés alguna consulta sobre tu pedido?</strong> Podés responder directamente a este correo o escribirnos por WhatsApp mencionando tu número de pedido <strong>#{orderId}</strong>.
    </p>
  </div>
</div>
`;

export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254112272061").replace(/\D/g, "");
export function whatsappLink(message?: string) {
  return `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

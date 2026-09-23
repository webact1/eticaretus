export function buildWhatsAppUrl(number: string, message: string) {
  const normalized = number.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
}

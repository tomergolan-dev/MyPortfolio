export function whatsappUrlFrom(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}

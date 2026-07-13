export function whatsappLink(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  return `https://wa.me/${digits}`
}

export function mailtoLink(email: string): string {
  return `mailto:${email}`
}

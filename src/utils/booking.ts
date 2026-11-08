export function getBookingHref(bookingUrl?: string, bookingMessage?: string): string {
  const fallback = 'mailto:waterlilicreations@gmail.com';

  if (!bookingUrl) {
    return fallback;
  }

  if (!bookingMessage) {
    return bookingUrl;
  }

  const separator = bookingUrl.includes('?') ? '&' : '?';

  return `${bookingUrl}${separator}text=${encodeURIComponent(bookingMessage)}`;
}

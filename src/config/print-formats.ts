import type { Locale } from '../i18n/config';

const sameInAllLanguages = (label: string): Record<Locale, string> => ({
  en: label,
  fr: label,
  pt: label,
});

// The shared price list. Changing a price here updates every watercolor.
// Prices are in euros. A watercolor chooses its formats with the keys below.
export const printFormats = {
  sticker: {
    label: { en: 'Sticker', fr: 'Autocollant', pt: 'Autocolante' },
    size: '2.5 cm',
    price: 3,
  },
  bookmark: {
    label: { en: 'Bookmark', fr: 'Marque-page', pt: 'Marcador de livros' },
    size: '5 × 15 cm',
    price: 4,
  },
  a6: {
    label: { en: 'Postcard (A6)', fr: 'Carte postale (A6)', pt: 'Postal (A6)' },
    size: '10.5 × 14.8 cm',
    price: 4,
  },
  a5card: {
    label: { en: 'Folded card (A6)', fr: 'Carte double (A6)', pt: 'Cartão dobrado (A6)' },
    size: '10.5 × 14.8 cm',
    price: 5,
  },
  a5: { label: sameInAllLanguages('A5'), size: '14.8 × 21 cm', price: 10 },
  a4: { label: sameInAllLanguages('A4'), size: '21 × 29.7 cm', price: 15 },
} as const;

export type PrintFormatId = keyof typeof printFormats;

export const printFormatIds = Object.keys(printFormats) as [
  PrintFormatId,
  ...PrintFormatId[],
];

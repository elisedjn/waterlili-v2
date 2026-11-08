import type { Locale } from '../i18n/config';

// The themes a watercolor can belong to. An artwork lists its themes in its yaml
// file (`tags: [christmas, love]`). They become filters on the shop page.
// To add a theme, add a line here, then use its key in the yaml files.
export const artworkTags = {
  christmas: { en: 'Christmas', fr: 'Noël', pt: 'Natal' },
  birthday: { en: 'Birthday', fr: 'Anniversaire', pt: 'Aniversário' },
  'positive-buddy': {
    en: 'Positive buddies',
    fr: 'Positive buddies',
    pt: 'Positive buddies',
  },
  love: { en: 'Love', fr: 'Amour', pt: 'Amor' },
  sea: { en: 'Sea', fr: 'Mer', pt: 'Mar' },
  animals: { en: 'Animals', fr: 'Animaux', pt: 'Animais' },
  night: { en: 'Night & stars', fr: 'Nuit & étoiles', pt: 'Noite e estrelas' },
} as const satisfies Record<string, Record<Locale, string>>;

export type ArtworkTagId = keyof typeof artworkTags;

export const artworkTagIds = Object.keys(artworkTags) as [
  ArtworkTagId,
  ...ArtworkTagId[],
];

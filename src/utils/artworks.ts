import { getCollection, type CollectionEntry } from 'astro:content';
import artworkImages from '../config/artwork-images.json';
import type { CarouselImage } from './carousel';

interface ImageFile {
  src: string;
  width: number;
  height: number;
}

export interface ArtworkImage {
  card: ImageFile;
  large: ImageFile;
}

export interface Artwork {
  slug: string;
  data: CollectionEntry<'artworks'>['data'];
  images: ArtworkImage[];
}

const imagesBySlug: Record<string, ArtworkImage[]> = artworkImages;

export async function getArtworks(): Promise<Artwork[]> {
  const entries = await getCollection('artworks', ({ data }) => !data.draft);

  return entries
    .map((entry) => {
      const images = imagesBySlug[entry.id];

      if (!images?.length) {
        throw new Error(
          `No images for "${entry.id}". Add them to originals/${entry.id}/ and run "npm run images".`,
        );
      }

      return { slug: entry.id, data: entry.data, images };
    })
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getArtworkStaticPaths() {
  const artworks = await getArtworks();

  return artworks.map((artwork) => ({
    params: { slug: artwork.slug },
    props: { artwork },
  }));
}

/** Adapts artwork images to the generic Carousel (card = small file, large = srcset of both). */
export function toCarouselImages(
  images: ArtworkImage[],
  size: 'card' | 'large',
): CarouselImage[] {
  return images.map((image) => {
    const file = size === 'large' ? image.large : image.card;

    return {
      src: file.src,
      width: file.width,
      height: file.height,
      srcset:
        size === 'large'
          ? [
              { src: image.card.src, width: image.card.width },
              { src: image.large.src, width: image.large.width },
            ]
          : undefined,
    };
  });
}

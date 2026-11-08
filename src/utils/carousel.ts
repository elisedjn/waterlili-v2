export interface CarouselImage {
  /** Path inside /public (without base). */
  src: string;
  width?: number;
  height?: number;
  /** Optional srcset where every url is a /public path (without base). */
  srcset?: { src: string; width: number }[];
}

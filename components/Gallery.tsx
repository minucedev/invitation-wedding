import fs from "fs";
import path from "path";
import sharp from "sharp";
import FadeIn from "./FadeIn";
import GalleryView, { type GridImage } from "./GalleryView";

const GRID_COUNT = 12;

// Featured in the love-story section instead of the album, so skip them here.
const EXCLUDE = new Set(["841A1941.jpg", "KHOA1629.jpg"]);

// On mobile the masonry preview shows only this curated short-list (in order),
// instead of the 12-image evenly-spaced grid used on tablet/desktop.
const MOBILE_GRID = [
  "841A3638.jpg",
  "841A2206.jpg",
  "841A2773.jpg",
  "KHOA0471.jpg",
  "KHOA1506.jpg",
  "841A2377.jpg",
  "841A3779.jpg",
].map((f) => `/images/gallery/${f}`);

function getGalleryImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "gallery");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !EXCLUDE.has(f))
      .sort()
      .map((f) => `/images/gallery/${f}`);
  } catch {
    return [];
  }
}

/** Evenly-spaced sample so the masonry grid shows variety from across the album. */
function pickGrid(images: string[]): string[] {
  if (images.length <= GRID_COUNT) return images;
  return Array.from(
    { length: GRID_COUNT },
    (_, i) => images[Math.floor((i * images.length) / GRID_COUNT)]
  );
}

async function withDimensions(src: string): Promise<GridImage> {
  try {
    const meta = await sharp(path.join(process.cwd(), "public", src)).metadata();
    if (meta.width && meta.height) {
      return { src, width: meta.width, height: meta.height };
    }
  } catch {
    // fall through to default ratio
  }
  return { src, width: 800, height: 1000 }; // 4:5 fallback
}

export default async function Gallery() {
  const images = getGalleryImages();
  const gridImages = await Promise.all(pickGrid(images).map(withDimensions));
  const mobileImages = await Promise.all(
    MOBILE_GRID.filter((src) => images.includes(src)).map(withDimensions)
  );

  return (
    <section
      className="py-section-gap px-4 bg-primary text-white overflow-hidden relative"
      id="album"
    >
      <FadeIn className="max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-center italic mb-16 text-custom-light">
          Khoảnh Khắc Yêu Thương
        </h2>
        <GalleryView
          gridImages={gridImages}
          mobileImages={mobileImages}
          allImages={images}
        />
      </FadeIn>
    </section>
  );
}

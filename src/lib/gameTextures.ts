export const TEXTURE_SIZE = 128;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Repeating wall panel — brand-coral background, the Move mark + a short impact phrase. */
export function createWallTexture(logo: HTMLImageElement | null, phrase: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ff4d5a";
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  if (logo) {
    const logoWidth = TEXTURE_SIZE * 0.5;
    const logoHeight = logoWidth * (logo.height / logo.width);
    ctx.globalAlpha = 0.85;
    ctx.drawImage(logo, (TEXTURE_SIZE - logoWidth) / 2, TEXTURE_SIZE * 0.18, logoWidth, logoHeight);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 14px sans-serif";
  ctx.fillText(phrase.toUpperCase(), TEXTURE_SIZE / 2, TEXTURE_SIZE * 0.72);

  return canvas;
}

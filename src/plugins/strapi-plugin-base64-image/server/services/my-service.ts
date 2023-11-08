import { Strapi } from "@strapi/strapi";
import sharp from 'sharp';

export default ({ strapi }: { strapi: Strapi }) => ({
  
  async convert(
    buffer: Buffer,
    width: number,
    height: number
  ): Promise<string> {
    const result = await sharp(buffer, {
      animated: true,
    })
      .rotate()
      .resize({
        height: height,
        width: width,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("webp")
      .toBuffer();

    return `data:image/webp;base64,${result.toString("base64")}`;
  },

});

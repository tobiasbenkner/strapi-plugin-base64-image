import { Strapi } from "@strapi/strapi";
import fs from "fs/promises";
import fsOld from "fs";

const pluginName = "strapi-plugin-base64-image";

export default ({ strapi }: { strapi: Strapi }) => ({
  async get(ctx) {
    try {
      const url = ctx.request.url.replace("/", "") as string;
      const index = url.indexOf("?");
      const src = fsOld.createReadStream(index === -1 ? url : url.substring(0, index));
      ctx.response.set("content-type", "image/webp");
      ctx.body = src;
    } catch (e) {
      ctx.throw(404);
    }
  },

  async upload(ctx) {
    const { files } = ctx.request.files;
    const { height = 500, width = 500 } = ctx.request.query;

    try {
      const data = await fs.readFile(files.path);
      const buffer = Buffer.from(data);

      const image = await strapi
        .plugin(pluginName)
        .service("myService")
        .convert(buffer, +width, +height);

      ctx.body = image;
    } finally {
      await fs.unlink(files.path);
    }
  },
});

import { Strapi } from '@strapi/strapi';

const pluginName = "strapi-plugin-base64-image";

export default ({ strapi }: { strapi: Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "field",
    type: "text",
    plugin: pluginName
  });
};

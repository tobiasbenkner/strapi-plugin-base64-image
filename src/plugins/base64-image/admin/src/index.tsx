import { prefixPluginTranslations } from "@strapi/helper-plugin";
import { ImageIcon } from "./components/ImageInput/ImageIcon";

const pluginName = "strapi-plugin-base64-image";
const fieldName = "field";

export default {
  register(app: any) {
    app.customFields.register({
      name: fieldName,
      pluginId: pluginName,
      type: "text",
      intlLabel: {
        id: `${pluginName}.${fieldName}.label`,
        defaultMessage: "Base64 Image",
      },
      intlDescription: {
        id: `${pluginName}.${fieldName}.description`,
        defaultMessage: "Store your image as Base64!",
      },
      icon: ImageIcon,
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/ImageInput"
          ),
      },
      options: {
        advanced: [
          {
            name: "options.width",
            type: "number",
            defaultValue: 500,
            intlLabel: {
              id: `${pluginName}.${fieldName}.options.advanced.width`,
              defaultMessage: "Max width",
            },
            description: {
              id: `${pluginName}.${fieldName}.options.advanced.width.description`,
              defaultMessage: "You can set here the max width for the image!",
            },
          },
          {
            name: "options.height",
            type: "number",
            defaultValue: 500,
            intlLabel: {
              id: `${pluginName}.${fieldName}.options.advanced.height`,
              defaultMessage: "Max height",
            },
            description: {
              id: `${pluginName}.${fieldName}.options.advanced.height.description`,
              defaultMessage: "You can set here the max height for the image!",
            },
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: `${pluginName}.${fieldName}.options.advanced.requiredField`,
                  defaultMessage: "Required field",
                },
                description: {
                  id: `${pluginName}.${fieldName}.options.advanced.requiredField.description`,
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },
  async registerTrads(app: any) {
    const { locales } = app;
    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginName),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );
    return Promise.resolve(importedTrads);
  },
};

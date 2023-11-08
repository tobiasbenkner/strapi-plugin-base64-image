import { Event } from "@strapi/database/dist/lifecycles";
import { Strapi } from "@strapi/strapi";
import { deleteFile, writeFile } from "./libs/fileUtils";
import { nanoid } from "nanoid";

const prefix = "data:image/webp;base64,";
const pluginName = "strapi-plugin-base64-image";
const fieldName = `plugin::${pluginName}.field`;

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.db?.lifecycles.subscribe({
    beforeCreate: async (event) => {
      const body = event.params.data;
      const bodyKeys = Object.keys(body);
      const fields = getFieldNames(event);
      const keys = fields.filter((value) => bodyKeys.includes(value));

      for (let key of keys) {
        const value = body[key];
        if (!value) {
          continue;
        }

        const valueIsString =
          typeof value === "string" || value instanceof String;

        if (!valueIsString || !value.startsWith(prefix)) {
          continue;
        }

        const fileRelativePath = generatePath(event);
        await writeFile(value.toString(), fileRelativePath);
        body[key] = "/" + fileRelativePath;
      }
    },
    beforeUpdate: async (event) => {
      const body = event.params.data;
      const id = event.params.data.id;

      const bodyKeys = Object.keys(body);
      const fields = getFieldNames(event);
      const keys = fields.filter((value) => bodyKeys.includes(value));

      if (keys.length === 0) {
        return;
      }

      const oldValues = await strapi.query(event.model.uid as any).findOne({
        where: {
          id: id,
        },
        select: fields,
      });

      for (let key of keys) {
        const oldValue = oldValues[key];
        const newValue = body[key];

        if (oldValue === newValue) {
          continue;
        }

        if (!newValue) {
          deleteFile(oldValue);
          continue;
        }

        const valueIsString =
          typeof newValue === "string" || newValue instanceof String;

        if (!valueIsString) {
          console.error("new value is not a string");
        }

        if (!newValue.startsWith(prefix)) {
          console.error("this should not happen");
          continue;
        }

        const fileRelativePath = `${pluginName}/${
          event.model.tableName
        }/${nanoid()}.webp`;

        await deleteFile(oldValue);
        await writeFile(newValue.toString(), fileRelativePath);
        body[key] = "/" + fileRelativePath;
      }
    },
    beforeDelete: async (event) => {
      const id = event.params.where.id;
      await handleDelete(event, id);
    },
    beforeDeleteMany: async (event) => {
      const ids = event.params.where["$and"][0]["id"]["$in"] as number[];
      for (let id of ids) {
        await handleDelete(event, id);
      }
    },
  });
};

function getFieldNames(event: Event) {
  return Object.keys(event.model.attributes).filter(
    (key) => (event.model.attributes[key] as any).customField === fieldName
  );
}

function generatePath(event: Event) {
  return `${pluginName}/${event.model.tableName}/${nanoid()}.webp`;
}

async function handleDelete(event: Event, id: number) {
  const keys = getFieldNames(event);
  if (keys.length === 0) {
    return;
  }

  const oldValues = await strapi.query(event.model.uid as any).findOne({
    where: {
      id: id,
    },
    select: keys,
  });

  for (let key of keys) {
    const value = oldValues[key];
    if (!value) {
      continue;
    }
    deleteFile(value);
  }
}

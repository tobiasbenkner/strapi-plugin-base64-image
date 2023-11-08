import type { Schema, Attribute } from '@strapi/strapi';

export interface ImagePictures extends Schema.Component {
  collectionName: 'components_image_pictures';
  info: {
    displayName: 'pictures';
  };
  attributes: {
    wonderful: Attribute.Text &
      Attribute.CustomField<
        'plugin::strapi-plugin-base64-image.field',
        {
          width: 500;
          height: 500;
        }
      >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'image.pictures': ImagePictures;
    }
  }
}

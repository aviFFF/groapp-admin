import type { Attribute, Schema } from '@strapi/strapi';

export interface OrderedItemOrderedItem extends Schema.Component {
  collectionName: 'components_ordered_item_ordered_items';
  info: {
    description: '';
    displayName: 'Ordered-Item';
    icon: 'arrowRight';
  };
  attributes: {
    amount: Attribute.Decimal;
    product: Attribute.Relation<
      'ordered-item.ordered-item',
      'oneToOne',
      'api::product.product'
    >;
    quantity: Attribute.Decimal;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ordered-item.ordered-item': OrderedItemOrderedItem;
    }
  }
}

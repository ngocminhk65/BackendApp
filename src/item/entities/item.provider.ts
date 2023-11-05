import { Item } from './item.entity'

export const ItemProvider = [
  {
    provide: 'ITEM_REPOSITORY',
    useValue: Item,
  },
];

import { Item_chaps } from "./item_chaps.enity";

export const ItemProvider = [
  {
    provide: 'ITEM_CHAP_REPOSITORY',
    useValue: Item_chaps,
  },
];

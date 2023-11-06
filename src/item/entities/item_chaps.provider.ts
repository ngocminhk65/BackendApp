import { Item_chaps } from "./item_chaps.enity";

export const ItemChapProvider = [
  {
    provide: 'ITEM_CHAP_REPOSITORY',
    useValue: Item_chaps,
  },
];

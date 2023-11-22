import { Item } from './item.entity';
import { Permission } from './permission.enity';

export const ItemProvider = [
  {
    provide: 'ITEM_REPOSITORY',
    useValue: Item,
  },
];

export const PermissionProvider = [
  {
    provide: 'PERMISSION_REPOSITORY',
    useValue: Permission,
  },
];

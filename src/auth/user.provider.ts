import { User } from "./user.enity";

export const UserProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];

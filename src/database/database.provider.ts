import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/auth/user.enity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Category } from 'src/item/entities/categoty.enity';
import { Item } from 'src/item/entities/item.entity';
import { ItemCategory } from 'src/item/entities/item_category.enity';
import { Item_chap_images } from 'src/item/entities/item_chap_images.enity';
import { Item_chaps } from 'src/item/entities/item_chaps.enity';
import { Permission } from 'src/item/entities/permission.enity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'develop',
        define: {
          timestamps: false,
        },
      });
      sequelize.addModels([
        Item,
        Item_chaps,
        Item_chap_images,
        User,
        Comment,
        Favorite,
        Category,
        ItemCategory,
        Permission,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

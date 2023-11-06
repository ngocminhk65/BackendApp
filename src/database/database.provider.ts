import { Sequelize } from 'sequelize-typescript';
import { Item } from 'src/item/entities/item.entity';
import { Item_chap_images } from 'src/item/entities/item_chap_images.enity';
import { Item_chaps } from 'src/item/entities/item_chaps.enity';

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
        define : {
          timestamps : false
        }
      });
      sequelize.addModels([Item,Item_chaps,Item_chap_images]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

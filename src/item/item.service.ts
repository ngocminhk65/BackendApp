// import { InjectModel } from "@nestjs/sequelize";
import { Item } from './entities/item.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Item_chaps } from './entities/item_chaps.enity';
import { Item_chap_images } from './entities/item_chap_images.enity';
import { Op, where } from 'sequelize';
import { Permission } from './entities/permission.enity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: typeof Item,
    @Inject('ITEM_CHAP_REPOSITORY')
    private itemChapRepository: typeof Item_chaps,
    @Inject('ITEM_CHAP_IMAGE_REPOSITORY')
    private itemChapImageRepository: typeof Item_chap_images,
  ) {}

  async findAll() {
    return this.itemRepository.findAll();
  }

  // find by name or description
  async find(searchParam) {
    const data = await this.itemRepository.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: '%' + searchParam + '%' } },
          { description: { [Op.like]: '%' + searchParam + '%' } },
        ],
      },
    });
    return data;
  }

  async findOne(id: number, user: any) {
    const userId = user.id;
    console.log(id, user.id);

    const manga = await this.itemRepository.findOne({
      where: { id: id },
      include: [
        {
          model: Favorite,
          where: { user_id: userId },
          required: false,
        },
      ],
    });
    const chap = await this.getChapOrderByOrders(id, userId);

    const dataResonse = {
      mangaDetail: {
        id: manga.id,
        title: manga.title,
        description: manga.description,
        total_like: manga.total_like,
        image_path: manga.image,
        created_at: manga.created_at,
        updated_at: manga.updated_at,
        deleted_at: manga.deleted_at,
        is_favorite: manga.favorites.length > 0 ? true : false,

      },
      listChap: chap,
    };
    return dataResonse;
  }
  async getChapOrderByOrders(itemId: number, userId: any) {
    const query = await this.itemChapRepository.findAll({
      where: { item_id: itemId },
      include: [
        {
          model: Permission,
          required: false,
          where: { user_id: userId },
        },
      ],
      order: [['orders', 'DESC']],
    });
    const data = query.map((item) => {
      return {
        id: item.id,
        item_id: item.item_id,
        name: item.name,
        orders: item.orders,
        is_delete: item.is_delete,
        created_at: item.created_at,
        updated_at: item.updated_at,
        deleted_at: item.deleted_at,
        canRead: item.permission.length > 0 ? true : false,
        price: item.price,
      };
    });
    return data;
  }

  async getImageOrderByOrders(chapId: number) {
    const data = await this.itemChapImageRepository.findAll({
      where: { chap_id: chapId },
      order: [['orders', 'DESC']],
    });
    data.map((item) => {
      item.image_path = 'http://localhost:9090/images/' + item.image_path;
    });
    return data;
  }

  async getNextChapterId(chapId: number) {
    const chap = await this.itemChapRepository.findOne({
      where: { id: chapId },
    });
    if (chap.orders == 1) {
      return chap.id;
    }
    const nextChap = await this.itemChapRepository.findOne({
      where: { item_id: chap.item_id, orders: chap.orders - 1 },
    });
    return nextChap.id;
  }

  async getPreviosChapterId(chapId: number) {
    const chap = await this.itemChapRepository.findOne({
      where: { id: chapId },
    });
    console.log({ chap });

    const nextChap = await this.itemChapRepository.findOne({
      where: { item_id: chap.item_id, orders: chap.orders + 1 },
    });
    console.log({ nextChap });
    if (!nextChap) {
      return chap.id;
    }

    return nextChap.id;
  }

  async getChapDetail(chapId: number, userId: any) {
    const checking = await this.itemChapRepository.findOne({
      where: { id: chapId },
      include: [
        {
          model: Permission,
          where: { user_id: userId },
        },
      ],
    });
    if (!checking) {
      return;
    }

    const nextChapterId = await this.getNextChapterId(chapId);
    const previosChapterId = await this.getPreviosChapterId(chapId);

    const chap = await this.itemChapRepository.findOne({
      where: { id: chapId },
    });
    const image = await this.getImageOrderByOrders(chapId);
    return {
      chapDetail: { chap, nextChapterId, previosChapterId },
      listImage: image,
    };
  }

  async getItemByCategory(categoryId: number) {}
}

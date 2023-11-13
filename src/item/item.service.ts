// import { InjectModel } from "@nestjs/sequelize";
import { Item } from './entities/item.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Item_chaps } from './entities/item_chaps.enity';
import { Item_chap_images } from './entities/item_chap_images.enity';
import { Op } from 'sequelize';
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

  async findOne(id: number) {
    const manga = await this.itemRepository.findOne({
      where: { id: id },
    });
    const chap = await this.getChapOrderByOrders(id);
    return {
      mangaDetail: manga,
      listChap: chap,
    };
  }
  async getChapOrderByOrders(itemId: number) {
    return this.itemChapRepository.findAll({
      where: { item_id: itemId },
      order: [['orders', 'DESC']],
    });
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
    const nextChap = await this.itemChapRepository.findOne({
      where: { item_id: chap.item_id, orders: chap.orders + 1 },
    });
    return nextChap.id;
  }

  async getChapDetail(chapId: number) {
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
}

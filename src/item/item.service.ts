// import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./entities/item.entity";
import { Injectable,Inject  } from "@nestjs/common";
import { Item_chaps } from "./entities/item_chaps.enity";
@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: typeof Item,
   ) {}

  async findAll() {
    return this.itemRepository.findAll();
  }

  async findById(id: number) {

    return "a";
  }
  async create(item: Item) {
    return "v";
  }

  async delete(id: number) {
    return "d";
  }

  async findOne(id: number) {
  return this.itemRepository.findOne({ where: { id: id }
  ,include:[Item_chaps] });
  }
}
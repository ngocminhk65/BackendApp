import { Inject, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { Item } from 'src/item/entities/item.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class FavoritesService {

  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private readonly favoriteRepository: typeof Favorite,
    @Inject('ITEM_REPOSITORY')
    private readonly itemRepository: typeof Item,
    private readonly authService: AuthService
  ) {

  }
  async create(id: any, user:any) {
      const item = await this.itemRepository.findOne({
        where: {
          id: id
        }
      });
      if (!item) {
        return {
          message: 'Item not found',
          status: 404
        }
      }
      const favorite = await this.favoriteRepository.findOne({
        where: {
          item_id: id,
          user_id: user.id
        }
      });
      if (favorite) {
        return {
          message: 'Item already in your favorite list',
          status: 401
        }
      }
    const data = await this.favoriteRepository.create({
      item_id:id,
      user_id: user.id
    });

    if (!item.total_like) {
      item.total_like = 1;
    }
    else {
      item.total_like += 1;
    }
    item.save();
    return {
      message: 'Add favorite success',
      status: 200,
      data: data
    }
  }

 async findAll(user:any) {
    const data = await this.favoriteRepository.findAll({
      where: {
        user_id: user.id
      },
      include: [
        {
          model: Item,
        }
      ]
    });
    return {
      message: 'Get favorite list success',
      status: 200,
      data: data
    }
  }

  async remove(id: number) {
    const data = await this.favoriteRepository.findOne({
      where: {
        id: id
      }
    });
    if (!data) {
      const remove = await this.favoriteRepository.destroy({
        where: {
          id: id
        }
      });
    return {
      message: 'Remove favorite success',
      status: 200,
      data: remove
    }
  }else {
    return {
      message: 'Remove favorite fail',
      status: 401,
    }
  }
  }
}

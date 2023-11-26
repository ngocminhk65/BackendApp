import { Inject, Injectable } from '@nestjs/common';
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
    private readonly authService: AuthService,
  ) {}
  async create(id: any, user: any) {
    const item = await this.itemRepository.findOne({
      where: {
        id: id,
      },
      include:[
        {
          model:Favorite,
          where: { user_id: user.id },
          required: false,
        }
      ]
    });
    if (!item) {
      return {
        message: 'Item not found',
        status: 404,
        success: false,
      };
    }
    const favorite = await this.favoriteRepository.findOne({
      where: {
        item_id: id,
        user_id: user.id,
      },
    });
    if (favorite) {
      return {
        message: 'Item already in your favorite list',
        status: 403,
        success: false,
      };
    }
    const data = await this.favoriteRepository.create({
      item_id: id,
      user_id: user.id,
    });

    if (!item.total_like) {
      item.total_like = 1;
    } else {
      item.total_like += 1;
    }
    item.save();
    const mangaDetail = {
      id:item.id,
      title:item.title,
      description:item.description,
      total_like:item.total_like,
      total_comment:item.total_comment,
      image_path:item.image,
      created_at:item.created_at,
      updated_at:item.updated_at,
      deleted_at:item.deleted_at,
      is_favorite: true,
    }
    return {
      message: 'Add favorite success',
      status: 200,
      success: true,
      data: {
        id: data.id,
        item_id: data.item_id,
        user_id: data.user_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        mangaDetail
      },
    };
  }

  async findAll(user: any) {
    const data = await this.favoriteRepository.findAll({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Item,
        },
      ],
    });
    return {
      message: 'Get favorite list success',
      status: 200,
      data: data,
    };
  }

  async remove(id: number, user: any) {
    
    const user_id = user.id;
    console.log(user);
    
    const data = await this.itemRepository.findOne({
      where: {
        id: id,
      },
    });    
    if (data) {
      const remove = await this.favoriteRepository.destroy({
        where: {
          item_id: id,
          user_id: user_id,
        },
      });
      if (!remove) {
        return {
          message: 'Remove favorite fail',
          status: 401,
        };
      }
      if (data.total_comment > 0) {
        data.total_comment -= 1;
      }
      data.save();
      return {
        message: 'Remove favorite success',
        success: true,
        status: 200,
        data: remove,
      };
    } else {
      return {
        message: 'Remove favorite fail',
        status: 401,
        success: false,
      };
    }
  }
}

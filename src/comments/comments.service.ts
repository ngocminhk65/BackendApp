import { Inject, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { User } from 'src/auth/user.enity';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CommentRepository')
    private readonly commentRepository: typeof Comment,

    @Inject('ITEM_REPOSITORY')
    private readonly itemRepository: typeof Item,
  ) {}

  async findAll(id: number) {
    const data = await this.commentRepository.findAll({
      where: {
        chap_id: id,
      },
      include: [User],
    });
    return {
      message: 'Get comment success',
      status: 200,
      data,
    };
  }

  async create(body: any, user: any, id: any) {
    const { content } = body;
    const userId = user.id;

    const comment = await this.commentRepository.create({
      chap_id: id,
      content: content,
      user_id: userId,
    });
    const item = await this.itemRepository.findOne({
      where: {
        id: id,
      },
    });
    if (item.total_comment) {
      item.total_comment += 1;
    } else {
      item.total_comment = 1;
    }
    item.save();
    return {
      message: 'Create comment success',
      status: 200,
      data: comment,
    };
  }

  async update(id: number, body: any) {
    const { content } = body;
    const comment = await this.commentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!comment) {
      return {
        message: 'Comment is not exist',
        status: 401,
      };
    }
    comment.content = content;
    comment.save();
    return {
      message: 'Update comment success',
      status: 200,
      data: comment,
    };
  }

  async checkUser(id, user: any) {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    if (comment.user_id !== user.id) {
      return false;
    }
    return true;
  }

  async remove(id: number) {
    const remvoe = await this.commentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!remvoe) {
      return {
        message: 'Comment is not exist',
        status: 401,
      };
    }
    remvoe.destroy();
    return {
      message: 'Remove comment success',
      status: 200,
      data: [],
    };
  }
}

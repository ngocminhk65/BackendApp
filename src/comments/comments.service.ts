import { Inject, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { User } from 'src/auth/user.enity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CommentRepository')
    private readonly commentRepository: typeof Comment,
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
    return {
      message: 'Create comment success',
      status: 200,
      data: comment,
    };
  }

  update(id: number, body: any) {
    const { content } = body;
    const comment = this.commentRepository.update(
      { content: content },
      { where: { id: id } },
    );
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
    const remove = await this.commentRepository.destroy({ where: { id: id } });
    return {
      message: 'Remove comment success',
      status: 200,
      data: remove,
    };
  }
}

import { Comment } from './comment.entity';

export const CommentProvider = [
  {
    provide: 'CommentRepository',
    useValue: Comment,
  },
];

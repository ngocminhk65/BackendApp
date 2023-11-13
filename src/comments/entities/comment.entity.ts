import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/auth/user.enity';

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  chap_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
  })
  is_delete: number;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  content: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  })
  updated_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: null,
  })
  deleted_at: Date;

  @BelongsTo(() => User)
  user: User;
}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/auth/user.enity';
import { Item_chaps } from './item_chaps.enity';

@Table({ tableName: 'permission' })
export class Permission extends Model<Permission> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Item_chaps)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  identification_code: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

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
  })
  deleted_at: Date;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Item_chaps)
  item_chaps: Item_chaps;
}

import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ItemCategory } from './item_category.enity';

@Table({ tableName: 'categorys' })
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  slug: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  link: string;

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

  @HasMany(() => ItemCategory)
  item_category: ItemCategory[];
}

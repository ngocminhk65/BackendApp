import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Item_chaps } from './item_chaps.enity';

@Table
export class Item_chap_images extends Model<Item_chap_images> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
    id: number;

    
    @ForeignKey(() => Item_chaps)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    chap_id: number;
    @BelongsTo(() => Item_chaps)
    Item_chaps: Item_chaps;


    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    image_path:string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    orders:number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    created_at: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updated_at: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deleted_at: Date;

}

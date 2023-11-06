import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Item } from './item.entity';
import { Item_chap_images } from './item_chap_images.enity';

@Table
export class Item_chaps extends Model<Item_chaps> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    item_id: number;
    @BelongsTo(() => Item)
    item: Item;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    name: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
    })
    orders: number;

    @Column({
        type: DataType.TINYINT,
        allowNull: false,
        defaultValue: 0,
    })
    is_delete: number;

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

    @HasMany(() => Item_chap_images)
    images: Item_chap_images[];
    // @ForeignKey(() => Item)
    // @Column
    // itemId: number
}
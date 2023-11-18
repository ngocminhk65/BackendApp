import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Item } from './item.entity';
import { Category } from './categoty.enity';

@Table({ tableName: 'item_categorys' })
export class ItemCategory extends Model<ItemCategory> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id: number;

    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    item_id: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    category_id: number;

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

    @BelongsTo(() => Item)
    item: Item;

    @BelongsTo(() => Category)
    category: Category;
}
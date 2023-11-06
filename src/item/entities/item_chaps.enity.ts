import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Item } from './item.entity';

@Table
export class ItemChap extends Model<ItemChap> {
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
    order: number;

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
    // @ForeignKey(() => Item)
    // @Column
    // itemId: number
}
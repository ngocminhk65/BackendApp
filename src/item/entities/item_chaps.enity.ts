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

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    item_id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    name: string;

    // @Column({
    //     type: DataType.STRING(500),
    //     allowNull: true,
    // })
    // description: string;

    // @Column({
    //     type: DataType.STRING(150),
    //     allowNull: true,
    // })
    // image: string;

    // @Column({
    //     type: DataType.BIGINT,
    //     allowNull: true,
    //     defaultValue: 0,
    // })
    // total_like: number;

    // @Column({
    //     type: DataType.BIGINT,
    //     allowNull: true,
    //     defaultValue: 0,
    // })
    // total_comment: number;

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
    @BelongsTo(() => Item)
    item: Item;
    @ForeignKey(() => Item)
    @Column
    itemId: number
}
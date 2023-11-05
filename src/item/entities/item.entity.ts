import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ItemChap } from './item_chaps.enity';

@Table
export class Item extends Model<Item> {
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
    author_id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    title: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING(150),
        allowNull: true,
    })
    image: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
        defaultValue: 0,
    })
    total_like: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
        defaultValue: 0,
    })
    total_comment: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
    })
    review: number;

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
    // 1 -n with item_chap
     @HasMany(() => ItemChap)
        item_chaps: ItemChap[];
}

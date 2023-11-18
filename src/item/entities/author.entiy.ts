import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'authors' })
export class Author extends Model<Author> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    item_id: number;

    @Column({
        type: DataType.STRING(150),
        allowNull: true,
    })
    image: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    })
    created_at: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    })
    updated_at: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: null,
    })
    deleted_at: Date;
}
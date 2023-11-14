import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/auth/user.enity';
import { Item } from 'src/item/entities/item.entity';

@Table({ tableName: 'favorites' })
export class Favorite extends Model<Favorite> {
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
        allowNull: true,
    })
    item_id: number;
    
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
        defaultValue: Date.now()
    })
    created_at: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: null,
    })
    deleted_at: Date;

    @BelongsTo(() => User)
    user: User;
  
    @BelongsTo(() => Item)
    item: Item;
    
}
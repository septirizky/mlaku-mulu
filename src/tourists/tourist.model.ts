import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Trip } from '../trips/trip.model';

@Table({ timestamps: true })
export class Tourist extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @ForeignKey(() => User)
  @Column
  declare user_id: number;

  @Column
  declare name: string;
  @Column
  declare phone: string;
  @Column
  declare address: string;
  @Column
  declare gender: string;
  @Column
  declare birth_day: Date;
  @Column
  declare nik: string;
  @Column
  declare nationality: string;

  @BelongsTo(() => User) user: User;
  @HasMany(() => Trip) trips: Trip[];
}

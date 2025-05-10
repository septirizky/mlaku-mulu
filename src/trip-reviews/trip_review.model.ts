import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Trip } from '../trips/trip.model';

@Table({ timestamps: true })
export class TripReview extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @ForeignKey(() => Trip)
  @Column
  declare trip_id: number;

  @Column
  declare rating: number;
  @Column
  declare comment: string;

  @BelongsTo(() => Trip) trip: Trip;
}

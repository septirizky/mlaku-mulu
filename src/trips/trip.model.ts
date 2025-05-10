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
import { Tourist } from '../tourists/tourist.model';
import { TripReview } from '../trip-reviews/trip_review.model';

@Table({ timestamps: true })
export class Trip extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @ForeignKey(() => Tourist)
  @Column
  declare tourist_id: number;

  @Column
  declare start_date: Date;
  @Column
  declare end_date: Date;
  @Column
  declare destination: string;

  @BelongsTo(() => Tourist) tourist: Tourist;
  @HasMany(() => TripReview) reviews: TripReview[];
}

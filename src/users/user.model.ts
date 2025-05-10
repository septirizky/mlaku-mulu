import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasOne,
  DataType,
  Default,
} from 'sequelize-typescript';
import { Tourist } from '../tourists/tourist.model';

@Table({ timestamps: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare username: string;

  @Column
  declare email: string;

  @Column
  declare password: string;

  @Default('tourist')
  @Column
  declare role: string;

  @Column(DataType.STRING)
  declare photo: string;

  @HasOne(() => Tourist)
  declare tourist: Tourist;
}

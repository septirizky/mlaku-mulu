import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './trip.model';

@Module({
  imports: [SequelizeModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TripReviewsController } from './trip-reviews.controller';
import { TripReviewsService } from './trip-reviews.service';
import { TripReview } from './trip_review.model';
import { Trip } from '../trips/trip.model';
import { TouristsModule } from '../tourists/tourists.module';

@Module({
  imports: [SequelizeModule.forFeature([TripReview, Trip]), TouristsModule],
  controllers: [TripReviewsController],
  providers: [TripReviewsService],
})
export class TripReviewsModule {}

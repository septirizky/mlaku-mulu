import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { TouristsModule } from './tourists/tourists.module';
import { TripsModule } from './trips/trips.module';
import { TripReviewsModule } from './trip-reviews/trip-reviews.module';
import { Tourist } from './tourists/tourist.model';
import { Trip } from './trips/trip.model';
import { TripReview } from './trip-reviews/trip_review.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      models: [User, Tourist, Trip, TripReview],
    }),
    TouristsModule,
    TripsModule,
    TripReviewsModule,
    AuthModule,
  ],
})
export class AppModule {}

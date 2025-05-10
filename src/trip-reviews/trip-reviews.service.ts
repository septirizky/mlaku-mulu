import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TripReview } from './trip_review.model';
import { Trip } from '../trips/trip.model';
import { Tourist } from '../tourists/tourist.model';

@Injectable()
export class TripReviewsService {
  constructor(
    @InjectModel(TripReview) private reviewModel: typeof TripReview,
    @InjectModel(Trip) private tripModel: typeof Trip,
  ) {}

  async create(data: any) {
    return this.reviewModel.create(data);
  }

  async findTripById(id: number) {
    return this.tripModel.findByPk(id, {
      include: [Tourist],
    });
  }

  async findByTripId(trip_id: number) {
    return this.reviewModel.findOne({ where: { trip_id } });
  }
}

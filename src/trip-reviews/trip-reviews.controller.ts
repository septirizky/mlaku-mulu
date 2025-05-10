import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { TripReviewsService } from './trip-reviews.service';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { TouristsService } from 'src/tourists/tourists.service';

@Controller('trip-reviews')
@UseGuards(JwtAuthGuard)
export class TripReviewsController {
  constructor(
    private readonly tripReviewsService: TripReviewsService,
    private readonly touristsService: TouristsService,
  ) {}

  @Post()
  async createReview(@Req() req: any, @Body() body: CreateTripReviewDto) {
    const userId = req.user.id;

    const trip = await this.tripReviewsService.findTripById(body.trip_id);

    if (!trip || !trip.tourist_id) {
      throw new BadRequestException('Trip tidak ditemukan atau tidak valid.');
    }

    const tourist = await this.touristsService.findOne(trip.tourist_id);
    if (tourist.user_id !== userId) {
      throw new BadRequestException(
        'Trip tidak ditemukan atau bukan milik Anda.',
      );
    }

    return this.tripReviewsService.create(body);
  }
}

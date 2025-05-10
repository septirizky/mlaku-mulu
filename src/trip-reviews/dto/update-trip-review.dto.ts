import { PartialType } from '@nestjs/mapped-types';
import { CreateTripReviewDto } from './create-trip-review.dto';

export class UpdateTripReviewDto extends PartialType(CreateTripReviewDto) {}

import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateTripReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  trip_id: number;
}

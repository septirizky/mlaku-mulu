import { IsNotEmpty, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsNumber()
  tourist_id: number;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  destination: string;
}

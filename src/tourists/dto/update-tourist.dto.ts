import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristDto } from './create-tourist.dto';
import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateTouristDto extends PartialType(CreateTouristDto) {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
  id: number;
}

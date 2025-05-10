import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterTouristDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  photo?: string;

  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  birth_day: Date;
  @IsNotEmpty()
  nik: string;
  @IsNotEmpty()
  nationality: string;
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TouristsService } from 'src/tourists/tourists.service';
import { RegisterTouristDto } from './dto/register-tourist.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly touristsService: TouristsService,
    private readonly jwtService: JwtService,
  ) {}

  async registerTourist(dto: RegisterTouristDto) {
    const emailExists = await this.usersService.findByEmail(dto.email);
    if (emailExists) {
      throw new BadRequestException('Email sudah digunakan.');
    }

    const usernameExists = await this.usersService.findByUsername(dto.username);
    if (usernameExists) {
      throw new BadRequestException('Username sudah digunakan.');
    }

    const user = await this.usersService.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      role: 'tourist',
      photo: dto.photo || 'http://localhost:3000/users/photo/noavatar.png',
    });

    const tourist = await this.touristsService.create({
      user_id: user.id,
      name: dto.name,
      phone: dto.phone,
      address: dto.address,
      gender: dto.gender,
      birth_day: dto.birth_day,
      nik: dto.nik,
      nationality: dto.nationality,
    });

    return {
      message: 'Tourist registered successfully',
      user,
      tourist,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email tidak ditemukan');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}

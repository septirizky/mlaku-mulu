import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(data: CreateUserDto) {
    const emailExists = await this.findByEmail(data.email);
    if (emailExists) {
      throw new BadRequestException('Email sudah digunakan.');
    }

    const usernameExists = await this.findByUsername(data.username);
    if (usernameExists) {
      throw new BadRequestException('Username sudah digunakan.');
    }

    const hashed = await bcrypt.hash(data.password, 10);
    return this.userModel.create({
      ...data,
      password: hashed,
    });
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);

    if (data.password && !data.password.startsWith('$2b$')) {
      const hashed = await bcrypt.hash(data.password, 10);
      data.password = hashed;
    }

    return user.update(data);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return user.destroy();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { username },
    });
  }
}

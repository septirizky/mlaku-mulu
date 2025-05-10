import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tourist } from './tourist.model';

@Injectable()
export class TouristsService {
  constructor(
    @InjectModel(Tourist)
    private touristModel: typeof Tourist,
  ) {}

  async create(data: any) {
    return this.touristModel.create(data);
  }

  async findAll() {
    return this.touristModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const tourist = await this.touristModel.findByPk(id, {
      include: { all: true },
    });
    if (!tourist) throw new NotFoundException('Tourist not found');
    return tourist;
  }

  async findByUserId(user_id: number) {
    const tourist = await this.touristModel.findOne({
      where: { user_id },
      include: { all: true },
    });
    if (!tourist) throw new NotFoundException('Tourist not found');
    return tourist;
  }

  async update(id: number, data: any) {
    const tourist = await this.findOne(id);
    return tourist.update(data);
  }

  async remove(id: number) {
    const tourist = await this.findOne(id);
    return tourist.destroy();
  }
}

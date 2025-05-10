import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trip } from './trip.model';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip)
    private tripModel: typeof Trip,
  ) {}

  async create(data: any) {
    return this.tripModel.create(data);
  }

  async findAll() {
    return this.tripModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const trip = await this.tripModel.findByPk(id, { include: { all: true } });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(id: number, data: any) {
    const trip = await this.findOne(id);
    return trip.update(data);
  }

  async remove(id: number) {
    const trip = await this.findOne(id);
    return trip.destroy();
  }
}

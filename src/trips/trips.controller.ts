import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('trips')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @Roles('admin', 'staff')
  async create(@Body() body: CreateTripDto) {
    return this.tripsService.create(body);
  }

  @Get()
  @Roles('admin', 'staff')
  async findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'staff')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'staff')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTripDto,
  ) {
    return this.tripsService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TouristsService } from './tourists.service';
import { TouristsController } from './tourists.controller';
import { Tourist } from './tourist.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Tourist]), UsersModule],
  controllers: [TouristsController],
  providers: [TouristsService],
  exports: [TouristsService],
})
export class TouristsModule {}

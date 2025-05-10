import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
  ParseIntPipe,
  Put,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('tourists')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TouristsController {
  constructor(
    private readonly touristsService: TouristsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('me')
  async getMyProfile(@Req() req: any) {
    return this.touristsService.findByUserId(req.user.id);
  }

  @Put('me')
  async updateMyProfile(@Req() req: any, @Body() body: UpdateTouristDto) {
    const tourist = await this.touristsService.findByUserId(req.user.id);

    const { email, username, password, ...touristData } = body;

    const updateUserPayload: any = {};

    if (email) {
      const existing = await this.usersService.findByEmail(email);
      if (existing && existing.id !== tourist.user_id) {
        throw new BadRequestException('Email sudah digunakan.');
      }
      updateUserPayload.email = email;
    }

    if (username) {
      const existing = await this.usersService.findByUsername(username);
      if (existing && existing.id !== tourist.user_id) {
        throw new BadRequestException('Username sudah digunakan.');
      }
      updateUserPayload.username = username;
    }

    if (password) {
      const bcrypt = await import('bcrypt');
      updateUserPayload.password = await bcrypt.hash(password, 10);
    }

    if (email || username || password) {
      await this.usersService.update(tourist.user_id, updateUserPayload);
    }

    return this.touristsService.update(tourist.id, touristData);
  }

  @Patch('me/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './assets',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updateMyPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const tourist = await this.touristsService.findByUserId(req.user.id);
    const user = await this.usersService.findOne(tourist.user_id);

    const oldPhoto = user.photo?.split('/').pop();

    const photoUrl = file
      ? `${req.protocol}://${req.get('host')}/users/photo/${file.filename}`
      : `${req.protocol}://${req.get('host')}/users/photo/noavatar.png`;

    if (file && oldPhoto && oldPhoto !== 'noavatar.png') {
      const fs = await import('fs');
      fs.unlinkSync(`./assets/${oldPhoto}`);
    }

    return this.usersService.update(user.id, { photo: photoUrl });
  }

  @Get()
  @Roles('admin', 'staff')
  async findAll() {
    return this.touristsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'staff')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.touristsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'staff')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTouristDto,
  ) {
    const tourist = await this.touristsService.findOne(body.id ?? id);
    const { email, username, password, ...touristData } = body;

    const updateUserPayload: any = {};

    if (email) {
      const existing = await this.usersService.findByEmail(email);
      if (existing && existing.id !== tourist.user_id) {
        throw new BadRequestException('Email sudah digunakan.');
      }
      updateUserPayload.email = email;
    }

    if (username) {
      const existing = await this.usersService.findByUsername(username);
      if (existing && existing.id !== tourist.user_id) {
        throw new BadRequestException('Username sudah digunakan.');
      }
      updateUserPayload.username = username;
    }

    if (password) {
      const bcrypt = await import('bcrypt');
      updateUserPayload.password = await bcrypt.hash(password, 10);
    }

    if (email || username || password) {
      await this.usersService.update(tourist.user_id, updateUserPayload);
    }

    return this.touristsService.update(id, touristData);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.touristsService.remove(id);
  }
}

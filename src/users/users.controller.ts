import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  ParseIntPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
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
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Body() body: CreateUserDto,
  ) {
    body.photo = file
      ? `${req.protocol}://${req.get('host')}/users/photo/${file.filename}`
      : `${req.protocol}://${req.get('host')}/users/photo/noavatar.png`;

    return this.usersService.create(body);
  }

  @Get()
  @Roles('admin', 'staff')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'staff')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'staff')
  async replaceUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Patch(':id/photo')
  @Roles('admin', 'staff')
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
  async updatePhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const user = await this.usersService.findOne(id);
    const oldPhoto = user.photo?.split('/').pop();

    const photoUrl = file
      ? `${req.protocol}://${req.get('host')}/users/photo/${file.filename}`
      : `${req.protocol}://${req.get('host')}/users/photo/noavatar.png`;

    if (file && oldPhoto && oldPhoto !== 'noavatar.png') {
      fs.unlinkSync(`./assets/${oldPhoto}`);
    }

    return this.usersService.update(id, { photo: photoUrl });
  }

  @Delete(':id')
  @Roles('admin')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('photo') photo: string,
  ) {
    const filename = photo?.split('/').pop();
    if (filename && filename !== 'noavatar.png') {
      fs.unlinkSync(`./assets/${filename}`);
    }

    return this.usersService.remove(id);
  }

  @Get('photo/:imgpath')
  getImage(@Param('imgpath') img: string, @Res() res: any) {
    res.sendFile(img, { root: './assets' });
  }
}

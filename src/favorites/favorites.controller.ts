import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(JwtStrategy)
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly authService: AuthService,
  ) {}

  @Post('item/:id')
  async create(
    @Body() body: any,
    @Param('id') id: string,
    @Request() req: any,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        message: 'JWT token is invalid',
        status: 401,
      };
    }
    return this.favoritesService.create(id, user);
  }

  @Get()
  async findAll(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    return this.favoritesService.findAll(user);
  }

  @Delete('item/:id')
  remove(@Param('id') id: string, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const user = this.authService.getUserByToken(token);
    return this.favoritesService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtGuard } from 'src/auth/jwt.gaurd';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(JwtStrategy)
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService,
  ) {}

  @Post('item/:id')
  async create(@Body() body: any, @Request() req, @Param('id') id: string) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        message: 'JWT token is invalid',
        status: 401,
      };
    }
    return this.commentsService.create(body, user, id);
  }

  @Get('item/:id')
  findAll(@Param('id') id: string) {
    return this.commentsService.findAll(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        message: 'JWT token is invalid',
        status: 401,
      };
    }
    const checkUser = await this.commentsService.checkUser(+id, user);
    if (!checkUser) {
      return {
        message: 'You do not have permission to update this comment',
        status: 401,
      };
    }
    return this.commentsService.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        message: 'JWT token is invalid',
        status: 401,
      };
    }
    const checkUser = await this.commentsService.checkUser(+id, user);
    if (!checkUser) {
      return {
        message: 'You do not have permission to delete this comment',
        status: 401,
      };
    }
    return this.commentsService.remove(+id);
  }
}

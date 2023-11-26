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
import { ItemService } from './item.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/jwt.gaurd';

@UseGuards(JwtGuard)
@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll() {
    const data = await this.itemService.findAll();
    if (!data) {
      return {
        status: 404,
        success: false,
        message: 'Not found',
      };
    }
    return {
      status: 200,
      success: true,
      data,
    };
  }

  @Get('find/:searchParam')
  async find(@Param('searchParam') searchParam: string) {
    const data = await this.itemService.find(searchParam);
    if (!data) {
      return {
        status: 404,
        success: false,
        message: 'Not found',
      };
    }
    return {
      status: 200,
      success: true,
      data,
    };
  }

  @Get('chap/:id')
  async getChapDetail(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log({token});
    console.log(id);
    console.log(req.user);
    
    
    
    

    
    if (!token) {
      return {
        status: 401,
        success: false,
        message: 'JWT token is required',
      };
    }
    if (!this.authService.checkToken(token)) {
      return {
        status: 401,
        success: false,
        message: 'JWT token is expired',
      };
    }
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        status: 401,
        success: false,
        message: 'JWT token is invalid',
      };
    }
    const data = await this.itemService.getChapDetail(+id, user.id);
    if (!data) {
      return {
        status: 404,
        success: false,
        message: 'Not found or you not have permission',
      };
    }
    return {
      status: 200,
      success: true,
      data,
    };
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    const usr = req.user;
    console.log({ usr });

    if (!token) {
      return {
        status: 401,
        success: false,
        message: 'JWT token is required',
      };
    }
    const validToken = await this.authService.checkToken(token);
    if (!validToken) {
      return {
        status: 401,
        success: false,
        message: 'JWT token is expired',
      };
    }
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        status: 401,
        success: false,
        message: 'JWT token is invalid',
      };
    }

    const data = await this.itemService.findOne(+id, user);
    if (!data) {
      return {
        status: 404,
        success: false,
        message: 'Not found',
      };
    }
    return {
      status: 200,
      success: true,
      data,
    };
  }
}

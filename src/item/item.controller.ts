import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

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
  async getChapDetail(@Param('id') id: string) {
    const data = await this.itemService.getChapDetail(+id);
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

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.itemService.findOne(+id);
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

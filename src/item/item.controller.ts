import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return "";

  }
  @Get()
  findAll() {
    return this.itemService.findAll();
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  //   return this.itemService.update(+id, updateItemDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return "";
  }
}

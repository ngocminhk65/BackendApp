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
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
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

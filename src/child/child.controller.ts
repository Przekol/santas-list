import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { ChildService } from './child.service';
import { ChildList, SingleChild } from '../types/child';
import { AddChildDto } from './dto/add-child.dto';

@Controller('child')
export class ChildController {
  constructor(@Inject(ChildService) private childService: ChildService) {}

  @Get('/')
  getAllChild(): Promise<ChildList> {
    return this.childService.getAllChild();
  }

  @Get('/:id')
  getOneChild(@Param('id') id: string): Promise<SingleChild> {
    return this.childService.getOneChild(id);
  }

  @Post('/')
  addNewChild(@Body() req: AddChildDto): Promise<SingleChild> {
    return this.childService.addNewChild(req);
  }
}

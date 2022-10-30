import { Controller, Get, Inject, Param } from '@nestjs/common';

import { ChildService } from './child.service';
import { Child } from './entities/child.entity';
import { SingleChild } from '../types/child';

@Controller('child')
export class ChildController {
  constructor(@Inject(ChildService) private childService: ChildService) {}

  @Get('/')
  getAllChild(): Promise<Child[]> {
    return this.childService.getAllChild();
  }

  @Get('/:id')
  getOneChild(@Param('id') id: string): Promise<SingleChild> {
    return this.childService.getOneChild(id);
  }
}

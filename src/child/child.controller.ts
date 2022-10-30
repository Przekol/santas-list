import { Controller, Get, Inject } from '@nestjs/common';

import { ChildService } from './child.service';
import { Child } from './entities/child.entity';

@Controller('child')
export class ChildController {
  constructor(@Inject(ChildService) private childService: ChildService) {}
  @Get('/')
  getAllChild(): Promise<Child[]> {
    return this.childService.getAllChild();
  }
}

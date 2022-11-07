import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ChildService } from './child.service';
import { ChildList, SingleChild } from '../types/child';
import { AddChildDto } from './dto/add-child.dto';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftForChild } from './dto/add-gift-for-child.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Child } from './entities/child.entity';

@ApiTags('Child')
@Controller('child')
export class ChildController {
  constructor(@Inject(ChildService) private childService: ChildService) {}

  @ApiOkResponse({
    description:
      'Children array results from child table with Gift table relation.',
  })
  @Get('/')
  getAllChild(): Promise<ChildList> {
    return this.childService.getAllChild();
  }

  @ApiOkResponse({ description: 'One child result' })
  @Get('/:id')
  getOneChild(@Param('id') id: string): Promise<SingleChild> {
    return this.childService.getOneChild(id);
  }

  @ApiCreatedResponse({
    description: 'The child has been successfully created.',
    type: Child,
  })
  @Post('/')
  addNewChild(@Body() req: AddChildDto): Promise<SingleChild> {
    return this.childService.addNewChild(req);
  }

  @ApiCreatedResponse({
    description: 'The gift has been successfully assigned to the child.',
  })
  @Patch('/gift/:childId')
  addGiftForChild(
    @Param('childId') childId: string,
    @Body() req: AddGiftForChild,
  ): Promise<SingleChild> {
    return this.childService.addGiftForChild(childId, req);
  }

  @ApiOkResponse({
    description: 'The child deleted.',
  })
  @Delete('/:id')
  deleteChild(@Param('id') id: string): Promise<GetSuccessInfo> {
    return this.childService.deleteChild(id);
  }
}

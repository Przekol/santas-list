import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChildService } from './child.service';
import { AddChildDto } from './dto/add-child.dto';
import { AddGiftForChildDto } from './dto/add-gift-for-child.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Child } from './entities/child.entity';
import { GetListOfChildrenRes, GetOneChildRes } from '../types/child';
import { ApiMessage } from 'src/utils/messages/api';

@ApiTags('Child')
@ApiInternalServerErrorResponse({
  description: ApiMessage.INTERNAL_SERVER_ERROR,
})
@Controller('child')
export class ChildController {
  constructor(
    @Inject(ChildService) private readonly childService: ChildService,
  ) {}

  @ApiOkResponse({
    description: ApiMessage.ARRAY_OF_ALL_RECORDS,
    isArray: true,
  })
  @Get('/')
  getAllChild(): Promise<GetListOfChildrenRes> {
    return this.childService.getAllChild();
  }

  @ApiOkResponse({ description: ApiMessage.THE_ONE_RESUL })
  @ApiBadRequestResponse({ description: ApiMessage.THE_RECORD_NOT_FOUND })
  @Get('/:id')
  getOneChild(@Param('id') id: string): Promise<GetOneChildRes> {
    return this.childService.getOneChild(id);
  }

  @ApiCreatedResponse({
    description: ApiMessage.THE_RECORD_BEEN_SUCCESSFULLY_CREATED,
    type: Child,
  })
  @ApiBody({ type: AddChildDto })
  @ApiBadRequestResponse({ description: ApiMessage.INVALID_INPUT })
  @Post('/')
  addNewChild(@Body() dto: AddChildDto): Promise<GetOneChildRes> {
    return this.childService.addNewChild(dto);
  }

  @ApiOkResponse({
    description: 'The gift has been successfully assigned to the child.',
    type: Child,
  })
  @ApiBody({ type: AddGiftForChildDto })
  @ApiBadRequestResponse({
    description: ApiMessage.THE_RECORD_NOT_FOUND,
  })
  @Patch('/gift/:childId')
  addGiftForChild(
    @Param('childId') childId: string,
    @Body() dto: AddGiftForChildDto,
  ): Promise<GetOneChildRes> {
    return this.childService.addGiftForChild(childId, dto);
  }

  @ApiNoContentResponse({
    description: ApiMessage.THE_RECORD_DELETED,
  })
  @ApiBadRequestResponse({ description: ApiMessage.THE_RECORD_NOT_FOUND })
  @HttpCode(204)
  @Delete('/:id')
  deleteChild(@Param('id') id: string): Promise<void> {
    return this.childService.deleteChild(id);
  }
}

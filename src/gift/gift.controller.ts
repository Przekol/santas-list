import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { GiftService } from './gift.service';
import { AddGiftDto } from './dto/add-gift.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Gift } from './entities/gift.entity';
import {
  GetListOfGiftsRes,
  GetOneGiftRes,
  GetSingleGiftResponse,
} from '../types/gift';
import { ApiExamples, ApiMessage } from '../utils/messages/api';

@ApiTags('Gift')
@ApiInternalServerErrorResponse({
  description: ApiMessage.INTERNAL_SERVER_ERROR,
})
@Controller('gift')
export class GiftController {
  constructor(@Inject(GiftService) private readonly giftService: GiftService) {}

  @ApiOkResponse({
    description: ApiMessage.ARRAY_OF_ALL_RECORDS,
    isArray: true,
  })
  @Get('/')
  getAllGifts(): Promise<GetListOfGiftsRes> {
    return this.giftService.getAllGifts();
  }

  @ApiOkResponse({ description: ApiMessage.THE_ONE_RESUL })
  @ApiBadRequestResponse({ description: ApiMessage.THE_RECORD_NOT_FOUND })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: ApiMessage.THE_RECORD_ID,
    examples: ApiExamples.oneGift,
  })
  @Get('/:id')
  getOneGift(@Param('id') id: string): Promise<GetSingleGiftResponse> {
    return this.giftService.getOneGift(id);
  }

  @ApiNoContentResponse({
    description: ApiMessage.THE_RECORD_DELETED,
  })
  @ApiBadRequestResponse({ description: ApiMessage.THE_RECORD_NOT_FOUND })
  @ApiMethodNotAllowedResponse({
    description: ApiMessage.CANNOT_DELETE_GIVEN_RECORD,
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: ApiMessage.THE_RECORD_ID,
    examples: ApiExamples.oneGift,
  })
  @HttpCode(204)
  @Delete('/:id')
  deleteGift(@Param('id') id: string): Promise<void> {
    return this.giftService.deleteGift(id);
  }

  @ApiCreatedResponse({
    description: ApiMessage.THE_RECORD_HAS_BEEN_SUCCESSFULLY_CREATED,
    type: Gift,
  })
  @ApiBadRequestResponse({ description: ApiMessage.INVALID_INPUT })
  @ApiBody({ type: AddGiftDto, examples: ApiExamples.addNewGift })
  @Post('/')
  addNewGift(@Body() req: AddGiftDto): Promise<GetOneGiftRes> {
    return this.giftService.addNewGift(req);
  }
}

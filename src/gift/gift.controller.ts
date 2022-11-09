import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { GiftService } from './gift.service';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftDto } from './dto/add-gift.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Gift } from './entities/gift.entity';
import {
  GetListOfGiftsRes,
  GetOneGiftRes,
  GetSingleGiftResponse,
} from '../types/gift';

@ApiTags('Gift')
@Controller('gift')
export class GiftController {
  constructor(@Inject(GiftService) private readonly giftService: GiftService) {}

  @ApiOkResponse({
    description: 'Gifts array results from gift table.',
  })
  @Get('/')
  getAllGifts(): Promise<GetListOfGiftsRes> {
    return this.giftService.getAllGifts();
  }

  @ApiOkResponse({ description: 'One gift result' })
  @Get('/:id')
  getOneGift(@Param('id') id: string): Promise<GetSingleGiftResponse> {
    return this.giftService.getOneGift(id);
  }

  @ApiOkResponse({
    description: 'The gift deleted.',
  })
  @Delete('/:id')
  deleteGift(@Param('id') id: string): Promise<GetSuccessInfo> {
    return this.giftService.deleteGift(id);
  }

  @ApiCreatedResponse({
    description: 'The child has been successfully created.',
    type: Gift,
  })
  @Post('/')
  addNewGift(@Body() req: AddGiftDto): Promise<GetOneGiftRes> {
    return this.giftService.addNewGift(req);
  }
}

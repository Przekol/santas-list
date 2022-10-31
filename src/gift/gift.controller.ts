import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { SingleGift, GiftsList, GetSingleGiftResponse } from '../types/gift';
import { GiftService } from './gift.service';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftDto } from './dto/add-gift.dto';

@Controller('gift')
export class GiftController {
  constructor(@Inject(GiftService) private giftService: GiftService) {}

  @Get('/')
  async getAllGifts(): Promise<GiftsList> {
    return this.giftService.getAllGifts();
  }

  @Get('/:id')
  getOneGift(@Param('id') id: string): Promise<GetSingleGiftResponse> {
    return this.giftService.getOneGift(id);
  }

  @Delete('/:id')
  async deleteGift(@Param('id') id: string): Promise<GetSuccessInfo> {
    return this.giftService.deleteGift(id);
  }

  @Post('/')
  async addNewGift(@Body() req: AddGiftDto): Promise<SingleGift> {
    return this.giftService.addNewGift(req);
  }
}

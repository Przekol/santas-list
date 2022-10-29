import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { SingleGift, GiftsList } from '../types/gift';
import { GiftService } from './gift.service';
import { GetSuccessInfo } from '../types/successInfo';

@Controller('gift')
export class GiftController {
  constructor(@Inject(GiftService) private giftService: GiftService) {}

  @Get('/')
  async getGiftsAll(): Promise<GiftsList> {
    return this.giftService.getItems();
  }

  @Get('/:id')
  async getGift(@Param('id') id: string): Promise<SingleGift> {
    return this.giftService.getItem(id);
  }

  @Delete('/:id')
  async deleteGift(@Param('id') id: string): Promise<GetSuccessInfo> {
    return this.giftService.deleteItem(id);
  }
}

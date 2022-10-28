import { Controller, Get, Inject } from '@nestjs/common';
import { GiftsList } from '../types/gift';
import { GiftService } from './gift.service';

@Controller('gift')
export class GiftController {
  constructor(@Inject(GiftService) private giftService: GiftService) {}

  @Get('/')
  async getGiftsAll(): Promise<GiftsList> {
    return this.giftService.getItems();
  }
}

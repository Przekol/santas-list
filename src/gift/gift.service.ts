import { Injectable } from '@nestjs/common';
import { GiftsList } from '../types/gift';
import { Gift } from './entities/gift.entity';

@Injectable()
export class GiftService {
  async getItems(): Promise<GiftsList> {
    const giftsList = await Gift.find();
    return { giftsList };
  }
}

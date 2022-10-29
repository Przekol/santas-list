import { Injectable } from '@nestjs/common';
import { SingleGift, GiftsList } from '../types/gift';
import { Gift } from './entities/gift.entity';

@Injectable()
export class GiftService {
  async getItems(): Promise<GiftsList> {
    const giftsList = await Gift.find();
    return { giftsList };
  }

  async getItem(id: string): Promise<SingleGift> {
    const gift = await Gift.findOne({
      where: { id },
    });
    if (!gift) {
      throw new Error('Gift not found.');
    }
    return { gift };
  }
}

import { Injectable } from '@nestjs/common';
import { SingleGift, GiftsList } from '../types/gift';
import { Gift } from './entities/gift.entity';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftDto } from './dto/add-gift.dto';

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

  async deleteItem(id: string): Promise<GetSuccessInfo> {
    const gift = await Gift.findOne({
      where: { id },
    });
    if (!gift) {
      throw new Error('Gift not found.');
    }
    await gift.remove();
    return { isSuccess: true };
  }

  async addItem(req: AddGiftDto): Promise<SingleGift> {
    const gift = new Gift();
    gift.name = req.name;
    gift.count = req.count;
    await gift.save();

    return { gift };
  }
}

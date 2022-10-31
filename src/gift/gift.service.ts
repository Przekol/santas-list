import { Inject, Injectable } from '@nestjs/common';
import { SingleGift, GiftsList } from '../types/gift';
import { Gift } from './entities/gift.entity';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftDto } from './dto/add-gift.dto';
import { DataSource } from 'typeorm';
import { Child } from '../child/entities/child.entity';

@Injectable()
export class GiftService {
  constructor(@Inject(DataSource) private dataSource: DataSource) {}
  async getAllGifts(): Promise<GiftsList> {
    return await Gift.find();
  }

  async getOneGift(id: string): Promise<SingleGift> {
    const gift = await Gift.findOne({
      where: { id },
    });
    if (!gift) {
      throw new Error('Gift not found.');
    }
    return gift;
  }

  async deleteGift(id: string): Promise<GetSuccessInfo> {
    const gift = await Gift.findOne({
      where: { id },
    });
    if (!gift) {
      throw new Error('Gift not found.');
    }
    await gift.remove();
    return { isSuccess: true };
  }

  async addNewGift(req: AddGiftDto): Promise<SingleGift> {
    const gift = new Gift();
    gift.name = req.name;
    gift.count = req.count;
    await gift.save();

    return gift;
  }

  async getCountGivenGifts(id: string): Promise<number> {
    return await this.dataSource
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .from(Child, 'child')
      .where('child.giftId=:id', { id })
      .getCount();
  }
}

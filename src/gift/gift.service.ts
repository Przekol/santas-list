import {
  BadRequestException,
  Inject,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { SingleGift, GiftsList, GetSingleGiftResponse } from '../types/gift';
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

  async getOneGift(id: string): Promise<GetSingleGiftResponse> {
    const gift = await Gift.findOne({
      where: { id },
    });
    if (!gift) {
      throw new BadRequestException('Gift not found.');
    }
    const givenCount = await this.getCountGivenGifts(id);
    return { gift, givenCount };
  }

  async deleteGift(id: string): Promise<GetSuccessInfo> {
    const gift = await Gift.findOne({
      where: { id },
    });
    if (!gift) {
      throw new BadRequestException('Gift not found.');
    }
    if ((await this.getCountGivenGifts(id)) > 0) {
      throw new MethodNotAllowedException('Cannot delete given gift');
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

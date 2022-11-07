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
import { ErrorMessage } from '../utils/messages/errors';

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
      throw new BadRequestException(ErrorMessage.GIFT_IS_NOT_FOUND);
    }
    const givenCount = await this.getCountGivenGifts(id);
    return { gift, givenCount };
  }

  async deleteGift(id: string): Promise<GetSuccessInfo> {
    const gift = await Gift.findOne({
      where: { id },
    });
    if (!gift) {
      throw new BadRequestException(ErrorMessage.GIFT_IS_NOT_FOUND);
    }
    if ((await this.getCountGivenGifts(id)) > 0) {
      throw new MethodNotAllowedException(ErrorMessage.CANNOT_DELETE_GIFT);
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

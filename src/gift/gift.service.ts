import {
  BadRequestException,
  Inject,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import {
  GetListOfGiftsRes,
  GetOneGiftRes,
  GetSingleGiftResponse,
} from '../types/gift';
import { Gift } from './entities/gift.entity';
import { AddGiftDto } from './dto/add-gift.dto';
import { DataSource } from 'typeorm';
import { Child } from '../child/entities/child.entity';
import { ErrorMessage } from '../utils/messages/errors';

@Injectable()
export class GiftService {
  constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}
  async getAllGifts(): Promise<GetListOfGiftsRes> {
    return await Gift.find();
  }

  async getOneGift(id: string): Promise<GetSingleGiftResponse> {
    const gift = await Gift.findOne({ where: { id: id } });
    if (!gift) {
      throw new BadRequestException(ErrorMessage.GIFT_IS_NOT_FOUND);
    }
    const givenCount = await this.getCountGivenGifts(id);
    return { gift, givenCount };
  }

  async deleteGift(id: string): Promise<void> {
    const { gift } = await this.getOneGift(id);

    if ((await this.getCountGivenGifts(id)) > 0) {
      throw new MethodNotAllowedException(ErrorMessage.CANNOT_DELETE_GIFT);
    }
    await gift.remove();
  }

  async addNewGift(dto: AddGiftDto): Promise<GetOneGiftRes> {
    const gift = new Gift();
    return gift.create(dto);
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

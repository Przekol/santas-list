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
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftDto } from './dto/add-gift.dto';
import { DataSource } from 'typeorm';
import { Child } from '../child/entities/child.entity';
import { ErrorMessage } from '../utils/messages/errors';

@Injectable()
export class GiftService {
  constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}
  async getAllGifts(): Promise<GetListOfGiftsRes> {
    return await Gift.getAll();
  }

  async getOneGift(id: string): Promise<GetSingleGiftResponse> {
    const gift = await Gift.getOne(id);
    const givenCount = await this.getCountGivenGifts(id);
    return { gift, givenCount };
  }

  async deleteGift(id: string): Promise<GetSuccessInfo> {
    const gift = await Gift.getOne(id);

    if ((await this.getCountGivenGifts(id)) > 0) {
      throw new MethodNotAllowedException(ErrorMessage.CANNOT_DELETE_GIFT);
    }
    return await gift.delete();
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

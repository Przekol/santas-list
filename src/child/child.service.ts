import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Child } from './entities/child.entity';
import { ChildList, SingleChild } from '../types/child';
import { AddChildDto } from './dto/add-child.dto';
import { GiftService } from '../gift/gift.service';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftForChild } from './dto/add-gift-for-child.dto';
import { ErrorMessage } from '../utils/messages/errors';

@Injectable()
export class ChildService {
  constructor(@Inject(GiftService) private giftService: GiftService) {}
  async getAllChild(): Promise<ChildList> {
    return await Child.find({ relations: ['gift'] });
  }

  async getOneChild(id: string): Promise<SingleChild> {
    const child = await Child.findOne({ where: { id }, relations: ['gift'] });
    if (!child) {
      throw new BadRequestException(ErrorMessage.CHILD_IS_NOT_FOUND);
    }
    return child;
  }

  async addNewChild(req: AddChildDto): Promise<SingleChild> {
    const child = new Child();
    child.name = req.name;
    await child.save();
    return child;
  }

  async addGiftForChild(
    childId: string,
    { giftId }: AddGiftForChild,
  ): Promise<SingleChild> {
    const child = await Child.findOne({
      where: { id: childId },
      relations: ['gift'],
    });
    if (!child) {
      throw new BadRequestException(ErrorMessage.CHILD_IS_NOT_FOUND);
    }

    const addedGift =
      giftId === '' ? null : await this.giftService.getOneGift(giftId);
    if (addedGift) {
      if (child.gift && child.gift.id === giftId) {
        return child;
      }
      if (
        addedGift.gift.count <=
        (await this.giftService.getCountGivenGifts(giftId))
      ) {
        throw new BadRequestException(ErrorMessage.GIFT_IS_NOT_ENOUGH);
      }
    }

    child.gift = addedGift ? addedGift.gift : null;
    await child.save();
    return child;
  }

  async deleteChild(id: string): Promise<GetSuccessInfo> {
    const child = await Child.findOne({ where: { id } });
    if (!child) {
      throw new BadRequestException(ErrorMessage.CHILD_IS_NOT_FOUND);
    }
    await child.remove();
    return { isSuccess: true };
  }
}

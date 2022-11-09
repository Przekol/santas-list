import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Child } from './entities/child.entity';
import { AddChildDto } from './dto/add-child.dto';
import { GiftService } from '../gift/gift.service';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftForChild } from './dto/add-gift-for-child.dto';
import { ErrorMessage } from '../utils/messages/errors';
import { GetListOfChildrenRes, GetOneChildRes } from '../types/child';

@Injectable()
export class ChildService {
  constructor(@Inject(GiftService) private readonly giftService: GiftService) {}

  async getAllChild(): Promise<GetListOfChildrenRes> {
    return await Child.getAll();
  }

  async getOneChild(id: string): Promise<GetOneChildRes> {
    return await Child.getOne(id);
  }

  async addNewChild(dto: AddChildDto): Promise<GetOneChildRes> {
    const child = new Child();
    return await child.create(dto);
  }

  async addGiftForChild(
    childId: string,
    { giftId }: AddGiftForChild,
  ): Promise<GetOneChildRes> {
    const child = await this.getOneChild(childId);

    return await this.setChildGift(giftId, child);
  }

  async deleteChild(id: string): Promise<GetSuccessInfo> {
    const child = await this.getOneChild(id);
    return await child.delete();
  }

  private async setChildGift(giftId: string, child: Child) {
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
}

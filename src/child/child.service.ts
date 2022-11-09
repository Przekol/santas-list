import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Child } from './entities/child.entity';
import { AddChildDto } from './dto/add-child.dto';
import { GiftService } from '../gift/gift.service';
import { AddGiftForChildDto } from './dto/add-gift-for-child.dto';
import { ErrorMessage } from '../utils/messages/errors';
import { GetListOfChildrenRes, GetOneChildRes } from '../types/child';

@Injectable()
export class ChildService {
  constructor(@Inject(GiftService) private readonly giftService: GiftService) {}

  async getAllChild(): Promise<GetListOfChildrenRes> {
    return await Child.find({ relations: ['gift'] });
  }

  async getOneChild(id: string): Promise<GetOneChildRes> {
    const child = await Child.findOne({
      where: { id: id },
      relations: ['gift'],
    });
    if (!child) {
      throw new BadRequestException(ErrorMessage.CHILD_IS_NOT_FOUND);
    }
    return child;
  }

  async addNewChild(dto: AddChildDto): Promise<GetOneChildRes> {
    const child = new Child();
    return await child.create(dto);
  }

  async addGiftForChild(
    childId: string,
    { giftId }: AddGiftForChildDto,
  ): Promise<GetOneChildRes> {
    const child = await this.getOneChild(childId);

    return await this.setChildGift(giftId, child);
  }

  async deleteChild(id: string): Promise<void> {
    const child = await this.getOneChild(id);
    await child.remove();
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

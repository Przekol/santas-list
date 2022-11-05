import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Child } from './entities/child.entity';
import { ChildList, SingleChild } from '../types/child';
import { AddChildDto } from './dto/add-child.dto';
import { GiftService } from '../gift/gift.service';
import { GetSuccessInfo } from '../types/success-info';
import { AddGiftForChild } from './dto/add-gift-for-child.dto';

@Injectable()
export class ChildService {
  constructor(@Inject(GiftService) private giftService: GiftService) {}
  async getAllChild(): Promise<ChildList> {
    return await Child.find({ relations: ['gift'] });
  }

  async getOneChild(id: string): Promise<SingleChild> {
    const child = await Child.findOne({ where: { id }, relations: ['gift'] });
    if (!child) {
      throw new BadRequestException('Child not found.');
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
      throw new BadRequestException('Child not found.');
    }
    // zostawić tak: giftId === '' lub zmienić na !giftId (zmienia się wtedy to co można wpisać w jsona)

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
        throw new BadRequestException("This gift isn't enough.");
      }
    }

    child.gift = addedGift ? addedGift.gift : null;
    await child.save();
    return child;
  }

  async deleteChild(id: string): Promise<GetSuccessInfo> {
    const child = await Child.findOne({ where: { id } });
    if (!child) {
      throw new BadRequestException('Child not found.');
    }
    await child.remove();
    return { isSuccess: true };
  }
}

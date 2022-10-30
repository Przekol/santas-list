import { Gift } from '../gift/entities/gift.entity';

export interface GiftInterface {
  id: string;
  name: string;
  count: number;
}
export type GiftsList = GiftInterface[];
export type SingleGift = Gift;

import { Gift } from '../../gift/entities/gift.entity';
import { Child } from '../../child/entities/child.entity';

export interface GiftEntity {
  id: string;
  name: string;
  count: number;
  child: Child[];
  createdAt: Date;
}
export type GetOneGiftRes = Gift;
export type GetListOfGiftsRes = Gift[];
export type GetSingleGiftResponse = {
  gift: Gift;
  givenCount: number;
};

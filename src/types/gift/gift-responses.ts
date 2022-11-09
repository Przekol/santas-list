import { Child } from '../../child/entities/child.entity';

export interface GiftEntity {
  id: string;
  name: string;
  count: number;
  child: Child[];
  createdAt: Date;
}
export type GetOneGiftRes = GiftEntity;
export type GetListOfGiftsRes = GiftEntity[];
export type GetSingleGiftResponse = {
  gift: GiftEntity;
  givenCount: number;
};

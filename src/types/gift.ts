export interface GiftInterface {
  id: string;
  name: string;
  count: number;
}
export type GiftsList = { giftsList: GiftInterface[] };
export type SingleGift = { gift: GiftInterface };

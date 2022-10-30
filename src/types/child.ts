import { GiftInterface } from './gift';

export interface ChildInterface {
  id: string;
  name: string;
  gift: GiftInterface | null;
}
export type SingleChild = ChildInterface;

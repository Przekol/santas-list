import { Gift } from '../gift/entities/gift.entity';
import { Child } from '../child/entities/child.entity';

export interface ChildInterface {
  id: string;
  name: string;
  gift: Gift | null;
}
export type ChildList = ChildInterface[];
export type SingleChild = Child;

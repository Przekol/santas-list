import { Gift } from '../../gift/entities/gift.entity';
import { Child } from '../../child/entities/child.entity';

export interface ChildEntity {
  id: string;
  name: string;
  gift: Gift | null;
  createdAt: Date;
  updatedAt: Date;
}
export type GetOneChildRes = Child;
export type GetListOfChildrenRes = Child[];

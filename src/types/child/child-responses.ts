import { Gift } from '../../gift/entities/gift.entity';

export interface ChildEntity {
  id: string;
  name: string;
  gift: Gift | null;
  createdAt: Date;
  updatedAt: Date;
}

export type GetOneChildRes = ChildEntity;
export type GetListOfChildrenRes = ChildEntity[];

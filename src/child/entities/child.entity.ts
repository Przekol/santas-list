import { Gift } from 'src/gift/entities/gift.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChildInterface } from '../../types/child';

@Entity()
export class Child extends BaseEntity implements ChildInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25, type: 'varchar' })
  name: string;

  @ManyToOne(() => Gift, (gift) => gift.child)
  @JoinColumn()
  gift: Gift;
}

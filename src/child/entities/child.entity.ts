import { Gift } from 'src/gift/entities/gift.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChildInterface } from '../../types/child';

@Entity()
export class Child extends BaseEntity implements ChildInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25, type: 'varchar' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Gift, (gift) => gift.child)
  @JoinColumn()
  gift: Gift;
}

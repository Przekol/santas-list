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
import { AddChildDto } from '../dto/add-child.dto';
import { ChildEntity, GetOneChildRes } from '../../types/child';

@Entity()
export class Child extends BaseEntity implements ChildEntity {
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

  async create(dto: AddChildDto): Promise<GetOneChildRes> {
    this.name = dto.name;
    return await this.save();
  }
}

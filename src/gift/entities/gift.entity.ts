import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Child } from '../../child/entities/child.entity';
import { GetOneGiftRes, GiftEntity } from '../../types/gift';
import { AddGiftDto } from '../dto/add-gift.dto';

@Entity()
export class Gift extends BaseEntity implements GiftEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'integer', default: 0 })
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Child, (child) => child.gift)
  child: Child[];

  async create(dto: AddGiftDto): Promise<GetOneGiftRes> {
    this.name = dto.name;
    this.count = dto.count;
    return await this.save();
  }
}

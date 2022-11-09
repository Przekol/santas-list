import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from 'src/utils/messages/errors';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Child } from '../../child/entities/child.entity';
import { GetListOfGiftsRes, GetOneGiftRes, GiftEntity } from '../../types/gift';
import { AddGiftDto } from '../dto/add-gift.dto';
import { GetSuccessInfo } from '../../types/success-info';

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

  async delete(): Promise<GetSuccessInfo> {
    await this.remove();
    return { isSuccess: true };
  }

  static async getAll(): Promise<GetListOfGiftsRes> {
    return await Gift.find();
  }

  static async getOne(id: string): Promise<GetOneGiftRes> {
    const gift = await Gift.findOne({ where: { id: id } });
    if (!gift) {
      throw new BadRequestException(ErrorMessage.GIFT_IS_NOT_FOUND);
    }
    return gift;
  }
}

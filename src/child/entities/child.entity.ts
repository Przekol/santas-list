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
import {
  ChildEntity,
  GetListOfChildrenRes,
  GetOneChildRes,
} from '../../types/child';
import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from '../../utils/messages/errors';

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

  async delete(): Promise<void> {
    await this.remove();
  }

  static async getAll(): Promise<GetListOfChildrenRes> {
    return await Child.find({ relations: ['gift'] });
  }

  static async getOne(id: string): Promise<GetOneChildRes> {
    const child = await Child.findOne({
      where: { id: id },
      relations: ['gift'],
    });
    if (!child) {
      throw new BadRequestException(ErrorMessage.CHILD_IS_NOT_FOUND);
    }
    return child;
  }
}

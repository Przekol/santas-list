import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GiftInterface } from '../../types/gift';

@Entity()
export class Gift extends BaseEntity implements GiftInterface {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 50, type: 'varchar' })
  public name: string;

  @Column({ type: 'integer', default: 0 })
  public count: number;
}

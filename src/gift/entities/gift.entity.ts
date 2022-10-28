import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gift extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 50, type: 'varchar' })
  public name: string;

  @Column({ type: 'integer', default: 0 })
  public count: number;
}

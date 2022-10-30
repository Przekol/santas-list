import { Injectable } from '@nestjs/common';
import { Child } from './entities/child.entity';
import { ChildList, SingleChild } from '../types/child';
import { AddChildDto } from './dto/add-child.dto';

@Injectable()
export class ChildService {
  async getAllChild(): Promise<ChildList> {
    return await Child.find({ relations: ['gift'] });
  }

  async getOneChild(id: string): Promise<SingleChild> {
    const [child] = await Child.find({ where: { id }, relations: ['gift'] });
    if (!child) {
      throw new Error('Child not found.');
    }
    return child;
  }

  async addNewChild(req: AddChildDto): Promise<SingleChild> {
    const child = new Child();
    child.name = req.name;
    await child.save();
    return child;
  }
}

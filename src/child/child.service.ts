import { Injectable } from '@nestjs/common';
import { Child } from './entities/child.entity';
import { SingleChild } from '../types/child';

@Injectable()
export class ChildService {
  async getAllChild(): Promise<Child[]> {
    return await Child.find({ relations: ['gift'] });
  }

  async getOneChild(id: string): Promise<SingleChild> {
    const [child] = await Child.find({ where: { id }, relations: ['gift'] });
    if (!child) {
      throw new Error('Child not found.');
    }
    return child;
  }
}

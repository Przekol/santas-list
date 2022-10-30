import { Injectable } from '@nestjs/common';
import { Child } from './entities/child.entity';

@Injectable()
export class ChildService {
  async getAllChild(): Promise<Child[]> {
    return await Child.find({ relations: ['gift'] });
  }
}

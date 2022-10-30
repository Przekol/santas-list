import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { GiftModule } from '../gift/gift.module';

@Module({
  imports: [GiftModule],
  controllers: [ChildController],
  providers: [ChildService],
})
export class ChildModule {}

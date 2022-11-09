import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GiftModule } from './gift/gift.module';
import { ChildModule } from './child/child.module';
import { ENV_VALIDATION_OBJECT } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ENV_VALIDATION_OBJECT,
    }),
    DatabaseModule,
    GiftModule,
    ChildModule,
  ],
})
export class AppModule {}

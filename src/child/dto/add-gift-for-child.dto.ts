import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddGiftForChild {
  @IsString()
  @ApiProperty({ format: 'uuid' })
  giftId: string;
}

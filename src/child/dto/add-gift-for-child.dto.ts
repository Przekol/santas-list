import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddGiftForChildReq } from '../../types/child';

export class AddGiftForChildDto implements AddGiftForChildReq {
  @IsString()
  @ApiProperty({ format: 'uuid' })
  giftId: string;
}

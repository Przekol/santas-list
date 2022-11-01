import { IsString } from 'class-validator';

export class AddGiftForChild {
  @IsString()
  giftId: string;
}

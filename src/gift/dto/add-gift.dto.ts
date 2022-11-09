import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { AddGiftReq } from '../../types/gift';

export class AddGiftDto implements AddGiftReq {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(999999)
  count: number;
}

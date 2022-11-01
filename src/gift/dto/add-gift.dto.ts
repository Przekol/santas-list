import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class AddGiftDto {
  @IsString()
  @Length(3, 55, {
    message: 'Gift name must be between 3 and 55 characters.',
  })
  name: string;

  @IsNumber()
  @Min(1, {
    message: 'The quantity of the gift should be between 1 and 999,999.',
  })
  @Max(999999, {
    message: 'The quantity of the gift should be between 1 and 999,999.',
  })
  count: number;
}

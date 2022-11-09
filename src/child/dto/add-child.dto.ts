import { IsNotEmpty, IsString, Length } from 'class-validator';
import { AddChildReq } from '../../types/child';

export class AddChildDto implements AddChildReq {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  name: string;
}

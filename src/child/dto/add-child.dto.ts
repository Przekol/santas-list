import { IsString, Length } from 'class-validator';

export class AddChildDto {
  @IsString()
  @Length(3, 25, {
    message: 'Name must be between 3 and 25 characters long.',
  })
  name: string;
}

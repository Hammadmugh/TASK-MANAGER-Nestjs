import {
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;
  @IsStrongPassword()
  password: string;
}

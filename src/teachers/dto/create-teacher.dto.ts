import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  teacher_name: string;

  @IsEmail()
  @MaxLength(50)
  @MinLength(10)
  teacher_email: string;

  @IsString()
  @MaxLength(20)
  @MinLength(10)
  teacher_phoneNumber: string;
}

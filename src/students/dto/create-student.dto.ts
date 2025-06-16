import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  student_name: string;

  @IsEmail()
  @MaxLength(50)
  @MinLength(10)
  student_email: string;

  @IsUUID()
  course_Id: string;
}

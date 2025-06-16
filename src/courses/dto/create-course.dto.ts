import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  course_name: string;

  @IsString()
  @MaxLength(50)
  @MinLength(10)
  course_description: string;
}

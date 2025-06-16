import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateStudentDto {

    @IsString()
    @MaxLength(50)
    @MinLength(4)
    student_name: string;

    @IsEmail()
    @MaxLength(50)
    @MinLength(10)
    student_email: string;
}

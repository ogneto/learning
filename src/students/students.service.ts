import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  notFoundStudent() {
    throw new NotFoundException(`This student doesn't exist.`);
  }

  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = await this.studentRepository.create( {
        student_name: createStudentDto.student_name,
        student_email: createStudentDto.student_email,
      });

      return await this.studentRepository.save(student);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `${createStudentDto.student_email} is already registered in the database.`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    const allStudents = await this.studentRepository.find();

    if (allStudents.length === 0) {
      return `There are no students registered.`;
    }

    return allStudents;
  }

  async findOne(id: string) {
    const allStudents = await this.studentRepository.find();

    if (allStudents.length === 0) {
      return 'There are no students registered';
    }

    const student = await this.studentRepository.findOneBy({
      id,
    });

    if (!student) {
      return this.notFoundStudent();
    }

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const updaetdStudent = {
      student_name: updateStudentDto?.student_name,
      student_email: updateStudentDto?.student_email,
    }
    const student = await this.studentRepository.preload({
      id,
      ...updaetdStudent,
    })

    if(!student) {
      return this.notFoundStudent();
    }

    return await this.studentRepository.save(student);
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}

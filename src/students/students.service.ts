import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {

  constructor(
  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>,
  ) {}
  
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll() {
    const allStudents = await this.studentRepository.find()

    if (allStudents.length === 0) {
      return `There are no students registered.`
    }

    return allStudents;
  }

  findOne(id: string) {
    return `This action returns a #${id} student`;
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}

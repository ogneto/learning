import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor (
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  notFoundTeacher() {
    throw new NotFoundException(`Teacher not found in the database`);
  }

  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher';
  }

  async findOne(id: string) {
    const teacher = await this.teacherRepository.findOneBy({
      id,
    })
    if (!teacher) {
      return this.notFoundTeacher();
    }
    return teacher;
  }

  async findAll() {
    const allTeachers = await this.teacherRepository.find();
    if (allTeachers.length === 0) {
      return `There are no teachers registered in the database.`
    }
    return allTeachers;
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: string) {
    return `This action removes a #${id} teacher`;
  }
}

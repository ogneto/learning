import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  notFoundTeacher() {
    throw new NotFoundException(`Teacher not found in the database`);
  }

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = {
        teacher_name: createTeacherDto.teacher_name,
        teacher_email: createTeacherDto.teacher_email,
        teacher_phoneNumber: createTeacherDto.teacher_phoneNumber,
      };
      return await this.teacherRepository.save(teacher);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`This email is already registered in the database.`);
      }
      throw error;
    }
  }

  async findOne(id: string) {
    const teacher = await this.teacherRepository.findOneBy({
      id,
    });
    if (!teacher) {
      return this.notFoundTeacher();
    }
    return teacher;
  }

  async findAll() {
    const allTeachers = await this.teacherRepository.find();
    if (allTeachers.length === 0) {
      return `There are no teachers registered in the database.`;
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

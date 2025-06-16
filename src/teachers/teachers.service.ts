import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        throw new ConflictException(
          `${createTeacherDto.teacher_email} is already registered in the database.`,
        );
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

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = {
      teacher_name: updateTeacherDto?.teacher_name,
      teacher_email: updateTeacherDto?.teacher_email,
      teacher_phoneNumber: updateTeacherDto?.teacher_phoneNumber,
    };
    const updatedTeacher = await this.teacherRepository.preload({
      id,
      ...teacher,
    });
    if (!updatedTeacher) {
      return this.notFoundTeacher();
    }
    return await this.teacherRepository.save(updatedTeacher);
  }

  async remove(id: string) {
    const teacher = await this.teacherRepository.findOneBy({
      id,
    });
    if (!teacher) {
      return this.notFoundTeacher();
    }

    const teacherCopy = teacher.teacher_name;
    await this.teacherRepository.remove(teacher);

    return `${teacherCopy} was deleted`;
  }
}

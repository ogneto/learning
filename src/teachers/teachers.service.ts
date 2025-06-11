import { Injectable } from '@nestjs/common';
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

  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher';
  }

  findAll() {
    return `This action returns all teachers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} teacher`;
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: string) {
    return `This action removes a #${id} teacher`;
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  notFoundCourse() {
    throw new NotFoundException(`This course doesn't exist.`);
  }

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = {
        course_name: createCourseDto.course_name,
        course_description: createCourseDto.course_description,
      };
      return await this.courseRepository.save(course);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `${createCourseDto.course_name} is already registered in the database.`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    const allCourses = await this.courseRepository.find();

    if (allCourses.length === 0) {
      return `There are no courses registered.`;
    }

    return allCourses;
  }

  async findOne(id: string) {
    const allCourses = await this.courseRepository.find();

    if (allCourses.length === 0) {
      return `There are no courses registered.`;
    }

    const course = await this.courseRepository.findOneBy({
      id,
    });

    if (!course) {
      return this.notFoundCourse();
    }

    return course;
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: string) {
    return `This action removes a #${id} course`;
  }
}

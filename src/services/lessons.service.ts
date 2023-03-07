import LessonRepository from '@/repositories/lesson.repository';
import { CreateLessonDto } from '@dtos/lessons.dto';
import { HttpException } from '@exceptions/HttpException';
import { Lesson } from '@interfaces/lessons.interface';
import lessonModel from '@models/lessons.model';
import { isEmpty } from '@utils/util';
import { hash } from 'bcrypt';
import { Document, FilterQuery, PaginateOptions } from 'mongoose';

class LessonService {
  private readonly lessons = lessonModel;
  private readonly lessonRepository: LessonRepository;

  constructor() {
    this.lessonRepository = new LessonRepository();
  }

  public async findPaginateLesson(filter: FilterQuery<Lesson & Document>, options?: PaginateOptions) {
    return this.lessonRepository.findPaginate(filter, options);
  }

  public async findAllLesson(): Promise<Lesson[]> {
    const lessons: Lesson[] = await this.lessonRepository.find();
    return lessons;
  }

  public async findLessonById(lessonId: string): Promise<Lesson> {
    if (isEmpty(lessonId)) throw new HttpException(400, 'LessonId is empty');

    const findLesson: Lesson = await this.lessons.findOne({ _id: lessonId });
    if (!findLesson) throw new HttpException(409, "Lesson doesn't exist");
    return findLesson;
  }

  public async createLesson(lessonData: CreateLessonDto): Promise<Lesson> {
    if (isEmpty(lessonData)) throw new HttpException(400, 'lessonData is empty');

    const findLesson: Lesson = await this.lessons.findOne({ name: lessonData.name });
    if (findLesson) throw new HttpException(409, `This name ${lessonData.name} already exists`);

    const createLessonData: Lesson = await this.lessons.create({ ...lessonData });

    return createLessonData;
  }

  public async updateLesson(lessonId: string, lessonData: CreateLessonDto): Promise<Lesson> {
    if (isEmpty(lessonData)) throw new HttpException(400, 'lessonData is empty');

    if (lessonData.name) {
      const findLesson: Lesson = await this.lessons.findOne({ name: lessonData.name });
      if (findLesson && findLesson._id != lessonId) throw new HttpException(409, `This name ${lessonData.name} already exists`);
    }

    const updateLessonById: Lesson = await this.lessons.findByIdAndUpdate(lessonId, lessonData, { new: true });
    if (!updateLessonById) throw new HttpException(409, "Lesson doesn't exist");

    return updateLessonById;
  }

  public async deleteLesson(lessonId: string): Promise<Lesson> {
    const deleteLessonById: Lesson = await this.lessons.findByIdAndDelete(lessonId);
    if (!deleteLessonById) throw new HttpException(409, "Lesson doesn't exist");

    return deleteLessonById;
  }
}

export default LessonService;

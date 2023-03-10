import { Lesson } from '@/interfaces/lessons.interface';
import QuestionRepository from '@/repositories/question.repository';
import LessonRepository from '@/repositories/lesson.repository';
import { CreateQuestionDto } from '@dtos/questions.dto';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@interfaces/questions.interface';
import questionModel from '@models/questions.model';
import { isEmpty } from '@utils/util';
import { Document, FilterQuery, PaginateOptions } from 'mongoose';

class QuestionService {
  private readonly questions = questionModel;
  private readonly questionRepository: QuestionRepository;
  private readonly lessonRepository: LessonRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
    this.lessonRepository = new LessonRepository();
  }

  public async findPaginateQuestion(filter: FilterQuery<Question & Document>, options?: PaginateOptions) {
    return this.questionRepository.findPaginate(filter, options);
  }

  public async findAllQuestion(): Promise<Question[]> {
    const questions: Question[] = await this.questionRepository.findAll({});
    return questions;
  }

  public async findQuestionById(questionId: string): Promise<Question> {
    if (isEmpty(questionId)) throw new HttpException(400, 'QuestionId is empty');

    const findQuestion: Question = await this.questions.findOne({ _id: questionId });
    if (!findQuestion) throw new HttpException(409, "Question doesn't exist");
    return findQuestion;
  }

  public async createQuestion(data: CreateQuestionDto): Promise<Question> {
    const { lessonId, ...questionData } = data;
    if (isEmpty(questionData)) throw new HttpException(400, 'questionData is empty');
    const findLesson: Lesson = await this.lessonRepository.findOne({ _id: lessonId });
    if (!findLesson) throw new HttpException(409, `This lesson id ${lessonId} is not exists`);

    const createQuestionData: Question = await this.questions.create({ ...questionData, lesson: lessonId });
    await this.lessonRepository.updateOne({ _id: lessonId }, { $addToSet: { questions: createQuestionData._id } });

    return createQuestionData;
  }

  public async updateQuestion(questionId: string, data: CreateQuestionDto): Promise<Question> {
    const { lessonId, ...questionData } = data;
    if (isEmpty(questionData)) throw new HttpException(400, 'questionData is empty');

    const findQuestion: Question = await this.questions.findOne({ _id: questionId });
    await this.lessonRepository.updateOne({ _id: findQuestion.lesson }, { $pull: { questions: findQuestion._id } });

    const updateQuestionById: Question = await this.questions.findByIdAndUpdate(questionId, questionData, { new: true });
    if (!updateQuestionById) throw new HttpException(409, "Question doesn't exist");
    await this.lessonRepository.updateOne({ _id: lessonId }, { $push: { questions: updateQuestionById._id } });

    return updateQuestionById;
  }

  public async deleteQuestion(questionId: string): Promise<Question> {
    const deleteQuestionById: Question = await this.questions.findByIdAndDelete(questionId);
    if (!deleteQuestionById) throw new HttpException(409, "Question doesn't exist");

    await this.lessonRepository.updateOne({ _id: deleteQuestionById.lesson }, { $pull: { questions: deleteQuestionById._id } });
    return deleteQuestionById;
  }
}

export default QuestionService;

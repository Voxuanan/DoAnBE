import { NextFunction, Request, Response } from 'express';
import { CreateLessonDto } from '@dtos/lessons.dto';
import { Lesson } from '@interfaces/lessons.interface';
import lessonService from '@services/lessons.service';

class LessonsController {
  public lessonService = new lessonService();

  public getLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = req.query;
      const options = {};
      const findAllLessonsData: Lesson[] = await this.lessonService.findPaginateLesson(filter, options);

      res.status(200).json({ data: findAllLessonsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLessonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lessonId: string = req.params.id;
      const findOneLessonData: Lesson = await this.lessonService.findLessonById(lessonId);

      res.status(200).json({ data: findOneLessonData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lessonData: CreateLessonDto = req.body;
      const createLessonData: Lesson = await this.lessonService.createLesson(lessonData);

      res.status(201).json({ data: createLessonData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lessonId: string = req.params.id;
      const lessonData: CreateLessonDto = req.body;
      const updateLessonData: Lesson = await this.lessonService.updateLesson(lessonId, lessonData);

      res.status(200).json({ data: updateLessonData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lessonId: string = req.params.id;
      const deleteLessonData: Lesson = await this.lessonService.deleteLesson(lessonId);

      res.status(200).json({ data: deleteLessonData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LessonsController;

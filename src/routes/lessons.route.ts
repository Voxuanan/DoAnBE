import { Router } from 'express';
import LessonsController from '@controllers/lessons.controller';
import { CreateLessonDto } from '@dtos/lessons.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { PaginationInputDto } from '@/dtos/pagination.dto';

class LessonsRoute implements Routes {
  public path = '/lessons';
  public router = Router();
  public lessonsController = new LessonsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, validationMiddleware(PaginationInputDto, 'query'), this.lessonsController.getLessons);
    this.router.get(`${this.path}/:id`, this.lessonsController.getLessonById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLessonDto, 'body'), this.lessonsController.createLesson);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateLessonDto, 'body', true), this.lessonsController.updateLesson);
    this.router.delete(`${this.path}/:id`, this.lessonsController.deleteLesson);
  }
}

export default LessonsRoute;

import { Router } from 'express';
import TopicsController from '@controllers/topics.controller';
import { CreateTopicDto } from '@dtos/topics.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TopicsRoute implements Routes {
  public path = '/topics';
  public router = Router();
  public topicsController = new TopicsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.topicsController.getTopics);
    this.router.get(`${this.path}/:id`, this.topicsController.getTopicById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTopicDto, 'body'), this.topicsController.createTopic);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateTopicDto, 'body', true), this.topicsController.updateTopic);
    this.router.delete(`${this.path}/:id`, this.topicsController.deleteTopic);
  }
}

export default TopicsRoute;

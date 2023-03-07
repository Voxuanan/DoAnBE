import { Router } from 'express';
import WordsController from '@controllers/words.controller';
import { Routes } from '@interfaces/routes.interface';

class WordsRoute implements Routes {
  public path = '/words';
  public router = Router();
  public wordsController = new WordsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:word`, this.wordsController.findAudio);
  }
}

export default WordsRoute;

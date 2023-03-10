import { NextFunction, Request, Response } from 'express';
import { CreateQuestionDto } from '@dtos/questions.dto';
import { Question } from '@interfaces/questions.interface';
import QuestionService from '@services/question.service';
import { pipeDTO } from '@/utils/pipeDTO';

class QuestionsController {
  public questionService = new QuestionService();

  public getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllQuestionsData: Question[] = await this.questionService.findAllQuestion();

      res.status(200).json({ data: findAllQuestionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getQuestionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const questionId: string = req.params.id;
      const findOneQuestionData: Question = await this.questionService.findQuestionById(questionId);

      res.status(200).json({ data: findOneQuestionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const questionData: CreateQuestionDto = req.body;
      const createQuestionData: Question = await this.questionService.createQuestion(questionData);

      res.status(201).json({ data: createQuestionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const questionId: string = req.params.id;
      const questionData: CreateQuestionDto = req.body;
      const updateQuestionData: Question = await this.questionService.updateQuestion(questionId, questionData);

      res.status(200).json({ data: updateQuestionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const questionId: string = req.params.id;
      const deleteQuestionData: Question = await this.questionService.deleteQuestion(questionId);

      res.status(200).json({ data: deleteQuestionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default QuestionsController;

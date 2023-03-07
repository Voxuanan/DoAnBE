import { NextFunction, Request, Response } from 'express';
import WordService from '@services/words.service';

class WordsController {
  public wordService = new WordService();

  public findAudio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const word: string = req.params.word;
      const findOneUserData: { audio: string } = await this.wordService.findAudio(word);

      res.status(200).json({ data: findOneUserData, message: 'findAudio' });
    } catch (error) {
      next(error);
    }
  };
}

export default WordsController;

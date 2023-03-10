import { NextFunction, Request, Response } from 'express';
import UtilService from '@services/utils.service';

class UtilController {
  public untilService = new UtilService();

  public findAudio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const word: string = req.params.word;
      const findOneAudio: { audio: string } = await this.untilService.findAudio(word);

      res.status(200).json({ data: findOneAudio, message: 'findAudio' });
    } catch (error) {
      next(error);
    }
  };
  public uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ data: { file: `/public/uploads/${req.file.filename}` }, message: 'findAudio' });
    } catch (error) {
      next(error);
    }
  };
}

export default UtilController;

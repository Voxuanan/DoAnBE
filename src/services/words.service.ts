import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import path from 'path';
import fs from 'fs';

class WordService {
  constructor() {}

  public async findAudio(word: string): Promise<{ audio: string }> {
    if (isEmpty(word)) throw new HttpException(400, 'Word is empty');
    const filePath = path.join(__dirname, `../../src/public/words/${word}.mp3`);
    const fileExist = fs.existsSync(filePath);
    if (!fileExist) throw new HttpException(409, "word doesn't exist");
    return { audio: `/public/words/${word}.mp3` };
  }
}

export default WordService;

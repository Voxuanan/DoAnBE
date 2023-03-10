import { IsObjectId } from '@/decorators/isObjectId.decorator';
import { IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  public name: string;

  @IsObjectId({
    message: 'Topid $value is not ObjectId.',
  })
  public topicId: string;
}

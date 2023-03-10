import { IsObjectId } from '@/decorators/isObjectId.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsObjectId({
    message: 'Topic $value is not ObjectId.',
  })
  @IsNotEmpty()
  public topicId: string;
}

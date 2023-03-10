import { IsObjectId } from '@/decorators/isObjectId.decorator';
import { IsPathUrl } from '@/decorators/isPathUrl.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @IsPathUrl({
    message: 'Audio $value is not a path or not exits',
  })
  public audio: string;

  @IsString()
  @IsNotEmpty()
  public answer: string;

  @IsObjectId({
    message: 'LessonId $value is not ObjectId.',
  })
  @IsNotEmpty()
  public lessonId: string;
}

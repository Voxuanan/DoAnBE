import { IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  public name: string;
}

import { IsEmail, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;
}

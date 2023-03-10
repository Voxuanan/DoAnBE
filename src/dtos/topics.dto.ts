import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public description: string;
}

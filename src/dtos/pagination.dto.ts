import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PaginationInputDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsOptional()
  sort?: string[] | object;

  @IsOptional()
  filter?: string[] | object;

  @IsOptional()
  @IsString()
  searchKey?: string;
}

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PaginationInputDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  filter?: string;

  @IsString()
  @IsOptional()
  searchKey?: string;
}

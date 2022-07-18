//
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '../enum/book.enum';
import { Transform } from 'class-transformer';

export class SearchQueryParamsDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  pageCount?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  price?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({
    enum: BookStatus,
    required: false,
    default: BookStatus.PUBLISH,
  })
  @IsEnum(BookStatus)
  @IsOptional()
  status?: BookStatus;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  authors?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  categories?: string;

  @ApiProperty({
    required: false,
    example: '2009-02-02',
  })
  @IsDateString()
  @IsOptional()
  date?: string;
}

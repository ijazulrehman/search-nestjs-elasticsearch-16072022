import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { BookStatus, CurrencyEum } from '../enum/book.enum';

class PublishedDetailDto {
  @ApiProperty()
  @IsDate()
  data: Date;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({
    enum: CurrencyEum,
  })
  @IsEnum(CurrencyEum)
  currency: CurrencyEum;
}

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  isbn: string;

  @ApiProperty()
  @IsNumber()
  pageCount: number;

  @ApiProperty()
  published: PublishedDetailDto;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  longDescription?: string;

  @ApiProperty({
    enum: BookStatus,
  })
  @IsEnum(BookStatus)
  status: BookStatus;

  @ApiProperty()
  @IsArray()
  authors: string[];

  @ApiProperty()
  @IsArray()
  categories: string[];
}

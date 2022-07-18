import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchQueryParamsDto } from './dto/search-query-params.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { BookServiceInterface } from './interface/book.service.interface';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(
    @Inject('BookServiceInterface')
    private readonly bookService: BookServiceInterface,
  ) {}

  @ApiCreatedResponse({
    type: BookEntity,
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.bookService.create(createBookDto);
  }

  @ApiOkResponse({
    type: BookEntity,
  })
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateProduct: UpdateBookDto,
  ): Promise<BookEntity> {
    return this.bookService.update(id, updateProduct);
  }

  @Get('/search')
  public async search(
    @Query() searchQueryParamsDto: SearchQueryParamsDto,
  ): Promise<any> {
    return this.bookService.search(searchQueryParamsDto);
  }
}

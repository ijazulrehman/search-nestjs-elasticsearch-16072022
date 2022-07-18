import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '@services/search/interface/search.service.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { BookRepositoryInterface } from './interface/book.repository.interface';
import { BookServiceInterface } from './interface/book.service.interface';
import { BookSearchObject } from './model/book.search.object';
@Injectable()
export class BookService implements BookServiceInterface {
  constructor(
    @Inject('BookRepositoryInterface')
    private readonly bookRepository: BookRepositoryInterface,
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  public async create(bookDto: CreateBookDto): Promise<BookEntity> {
    const book = new BookEntity(bookDto);
    return this.bookRepository.create(book);
  }

  public async update(
    bookId: any,
    updateBook: UpdateBookDto,
  ): Promise<BookEntity> {
    const book = await this.bookRepository.findOneById(bookId);
    return this.bookRepository.create({
      ...book,
      ...updateBook,
    });
  }

  public async search(q: any): Promise<any> {
    const data = BookSearchObject.searchObject(q);
    return this.searchService.searchIndex(data);
  }
}

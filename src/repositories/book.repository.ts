import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepositoryInterface } from '@components/book/interface/book.repository.interface';
import { BookEntity } from '@components/book/entities/book.entity';

@Injectable()
export class BookRepository
  extends BaseAbstractRepository<BookEntity>
  implements BookRepositoryInterface
{
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {
    super(bookRepository);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { SearchServiceInterface } from '../../services/search/interface/search.service.interface';
import { BookServiceInterface } from './interface/book.service.interface';
import { BookRepository } from '@repositories/book.repository';
import { BookRepositoryInterface } from './interface/book.repository.interface';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchService } from '@services/search/search.service';

describe('BookController', () => {
  let controller: BookController;

  const mockBookService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: 'BookServiceInterface',
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

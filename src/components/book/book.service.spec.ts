import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { SearchService } from '../../services/search/search.service';
import { SearchServiceInterface } from '../../services/search/interface/search.service.interface';
import { BookRepository } from '@repositories/book.repository';
import { BookRepositoryInterface } from './interface/book.repository.interface';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';

describe('BookService', () => {
  let service: BookService;
  const mockBookRepository = {};
  const mockElasticSearch = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: 'BookRepositoryInterface',
          useClass: BookRepository,
        },
        {
          provide: 'SearchServiceInterface',
          useClass: SearchService,
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockBookRepository,
        },
        {
          provide: ElasticsearchService,
          useValue: mockElasticSearch,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

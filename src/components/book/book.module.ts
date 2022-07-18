import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SearchService } from '../../services/search/search.service';
import { SearchServiceInterface } from '../../services/search/interface/search.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BookServiceInterface } from './interface/book.service.interface';
import { BookRepository } from '@repositories/book.repository';
import { BookRepositoryInterface } from './interface/book.repository.interface';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  controllers: [BookController],
  providers: [
    {
      provide: 'BookServiceInterface',
      useClass: BookService,
    },
    {
      provide: 'BookRepositoryInterface',
      useClass: BookRepository,
    },
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
  ],
})
export class BookModule {}

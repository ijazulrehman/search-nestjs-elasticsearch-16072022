import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from '@services/search/search.service';
import { BookElasticIndex } from '@services/search/search-index/book.elastic.index';
import { SearchServiceInterface } from '@services/search/interface/search.service.interface';
import { PostSubscriber } from '@observers/subscribers/book.subscriber';
import { BookEntity } from '@components/book/entities/book.entity';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { config } from './../../libs/config/src';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    ElasticsearchModule.register({
      node: config.ES_HOST,
    }),
  ],
  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    BookElasticIndex,
    PostSubscriber,
  ],
  controllers: [],
  exports: [],
})
export class ObserverModule {}

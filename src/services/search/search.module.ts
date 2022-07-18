import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchServiceInterface } from './interface/search.service.interface';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { ConfigSearch } from './config/config.search';
import { config } from './../../../libs/config/src';

@Module({
  imports: [
    ElasticsearchModule.register(ConfigSearch.searchConfig(config.ES_HOST)),
  ],
  controllers: [],
  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
  ],
})
export class SearchModule {}

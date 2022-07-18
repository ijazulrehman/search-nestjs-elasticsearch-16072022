import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { Client, Connection } from "@elastic/elasticsearch"

import { ConfigSearch } from './config/config.search';
import { SearchServiceInterface } from './interface/search.service.interface';
import { config } from './../../../libs/config/src';
import { IndicesCreate } from '@elastic/elasticsearch/api/requestParams';

@Injectable()
export class SearchService implements SearchServiceInterface<any> {
  constructor(private elasticSearch: ElasticsearchService) {}

  public async checkIndex(index: string): Promise<any> {
    return await this.elasticSearch.indices.exists({ index });
  }

  public async createIndex(indicesCreate: IndicesCreate): Promise<any> {
    return await this.elasticSearch.indices.create(indicesCreate);
  }

  public async insertIndex(bulkData: any): Promise<any> {
    return await this.elasticSearch
      .bulk(bulkData)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async updateIndex(updateData: any): Promise<any> {
    return await this.elasticSearch
      .update(updateData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async searchIndex(searchData: any): Promise<any> {
    return await this.elasticSearch
      .search(searchData)
      .then((res) => {
        return res.body.hits.hits;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteIndex(indexData: any): Promise<any> {
    return await this.elasticSearch.indices
      .delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteDocument(indexData: any): Promise<any> {
    return await this.elasticSearch
      .delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}

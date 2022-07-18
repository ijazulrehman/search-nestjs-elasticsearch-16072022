import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { BookElasticIndex } from '@services/search/search-index/book.elastic.index';
import { InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BookEntity } from '@components/book/entities/book.entity';

@Injectable()
export class PostSubscriber implements EntitySubscriberInterface<BookEntity> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly bookEsIndex: BookElasticIndex,
  ) {
    connection.subscribers.push(this);
  }

  public listenTo(): any {
    return BookEntity;
  }

  public async afterInsert(event: InsertEvent<BookEntity>): Promise<any> {
    return this.bookEsIndex.insertBookDocument([event.entity]);
  }

  public async afterUpdate(event: UpdateEvent<BookEntity>): Promise<any> {
    console.log(event.entity, 'event entity', event.databaseEntity);
    return this.bookEsIndex.updateBookDocument(event.databaseEntity);
  }
}

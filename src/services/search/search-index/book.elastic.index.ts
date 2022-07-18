import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SearchServiceInterface } from '../interface/search.service.interface';
import {
  bookIndex,
  bookIndexMapping as mappings,
} from '../constant/book.elastic';
import { BookEntity } from '@components/book/entities/book.entity';
import { SeedBookIndex } from '../constant/book.seed';

@Injectable()
export class BookElasticIndex implements OnModuleInit {
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  async onModuleInit() {
    const { statusCode } = await this.searchService.checkIndex(
      bookIndex._index,
    );
    if (statusCode !== 200) {
      await this.searchService.createIndex({
        index: bookIndex._index,
        body: {
          mappings,
        },
      });
      await this.insertBookDocument(
        await SeedBookIndex.getSeedingDate(
          'https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e',
        ),
      );
    }
  }

  public async insertBookDocument(books: BookEntity[]): Promise<any> {
    const data = this.bookDocument(books);
    return await this.searchService.insertIndex(data);
  }

  public async updateBookDocument(book: BookEntity): Promise<any> {
    const data = this.bookDocument([book]);
    await this.deleteBookDocument(book._id);
    return await this.searchService.insertIndex(data);
  }

  private async deleteBookDocument(bookId: string): Promise<any> {
    const data = {
      index: bookIndex._index,
      type: bookIndex._type,
      id: bookId.toString(),
    };
    return await this.searchService.deleteDocument(data);
  }

  private bulkIndex(bookId: string): any {
    return {
      _index: bookIndex._index,
      _id: bookId,
    };
  }

  private bookDocument(books: BookEntity[]): any {
    const body = books.flatMap((book) => {
      const index = this.bulkIndex(book._id);
      const { _id, published, ...props } = book;
      return [{ index }, { ...props, ...published }];
    });
    return {
      body,
      refresh: true,
    };
  }
}

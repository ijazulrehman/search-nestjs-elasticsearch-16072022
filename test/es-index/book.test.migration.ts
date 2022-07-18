import { Client } from '@elastic/elasticsearch';
import { config } from '@app/config/config';
import { ConfigSearch } from '@services/search/config/config.search';
import {
  bookIndex,
  bookIndexMapping as mappings,
} from '@services/search/constant/book.elastic';
import { SeedBookIndex } from '@services/search/constant/book.seed';

const client = new Client(ConfigSearch.searchConfig(config.ES_HOST));

function bulkIndex(bookId: string): any {
  return {
    _index: bookIndex._index,
    _id: bookId,
  };
}

function bookDocument(books: any): any {
  const body = books.flatMap((book) => {
    const index = bulkIndex(book._id);
    const { _id, published, ...props } = book;
    return [{ index }, { ...props, ...published }];
  });
  return {
    body,
    refresh: true,
  };
}

async function insertBookDocument(books: any): Promise<any> {
  const data = bookDocument(books);
  return await this.client
    .bulk(data)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
}

export class BookIndexTestMigration {
  public static async up() {
    const { statusCode } = await client.indices.exists({
      index: bookIndex._index,
    });

    if (statusCode !== 200) {
      await client.indices.create({
        index: bookIndex._index,
        body: {
          mappings,
        },
      });
      await insertBookDocument(
        await SeedBookIndex.getSeedingDate(
          'https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e',
        ),
      );
    }
  }

  public static async down() {
    //distroy index
  }
}

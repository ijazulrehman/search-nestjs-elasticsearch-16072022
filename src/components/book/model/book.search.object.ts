import { bookIndex } from '../../../services/search/constant/book.elastic';
import { BookSearchQuery } from '../query/book-search-query';

export class ElasticSearchBody {
  size: number;
  from: number;
  query: any;

  constructor(size: number, from: number, query: any) {
    this.size = size;
    this.from = from;
    this.query = query;
  }
}

export class BookSearchObject {
  public static searchObject(q: any) {
    const body = this.elasticSearchBody(q);
    return { index: bookIndex._index, body };
  }

  public static elasticSearchBody(q: any): ElasticSearchBody {
    const query = BookSearchQuery.normalizeQuery(q, 'query', 'date');

    return new ElasticSearchBody(50, 0, query);
  }
}

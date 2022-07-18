//

import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookEntity } from '../entities/book.entity';

export interface BookServiceInterface {
  create(bookDto: CreateBookDto): Promise<BookEntity>;

  update(bookId: any, updateProduct: UpdateBookDto): Promise<BookEntity>;

  search(q: any): Promise<any>;
}

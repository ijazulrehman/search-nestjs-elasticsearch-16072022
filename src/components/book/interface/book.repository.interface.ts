//

import { BaseInterfaceRepository } from '@repositories/base/base.interface.repository';
import { BookEntity } from '../entities/book.entity';

export type BookRepositoryInterface = BaseInterfaceRepository<BookEntity>;

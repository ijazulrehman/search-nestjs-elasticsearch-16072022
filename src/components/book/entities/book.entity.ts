import { Base } from '@database/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { BookStatus, CurrencyEum } from '../enum/book.enum';

class PublishedDetailEntity {
  @ApiProperty()
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  date: Date;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty({
    enum: CurrencyEum,
  })
  @Column()
  currency: CurrencyEum;
}

@Entity({ name: 'books' })
export class BookEntity extends Base {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  isbn: string;

  @ApiProperty()
  @Column()
  pageCount: number;

  @ApiProperty()
  @Column(() => PublishedDetailEntity)
  published: PublishedDetailEntity;

  @ApiProperty()
  @Column()
  thumbnailUrl?: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  shortDescription?: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  longDescription?: string;

  @ApiProperty({
    enum: BookStatus,
  })
  status: BookStatus;

  @ApiProperty()
  @Column()
  authors: string[];

  @ApiProperty()
  @Column()
  categories: string[];
}

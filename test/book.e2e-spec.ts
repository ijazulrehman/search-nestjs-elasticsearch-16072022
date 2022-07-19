import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { BookEntity } from '@components/book/entities/book.entity';
import { BookModule } from '@components/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@database/config/ormconfig';
import { QueryParamsUtil } from './utils/query-params.util';
import { BookIndexTestMigration } from './es-index/book.test.migration';
import { Client } from '@elastic/elasticsearch';
import { ConfigSearch } from '@services/search/config/config.search';
import { config } from '@app/config';
const client = new Client(ConfigSearch.searchConfig(config.ES_HOST));

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<BookEntity>;
  let booKIndex: BookIndexTestMigration;

  const searchTestData = [
    [{ price: 40 }, 17],
    [{ categories: 'Java' }, 30],
    [{ date: '2009-04-01', price: 40 }, 2],
    [{ date: '2011' }, 6],
  ];

  beforeAll(async () => {
    await BookIndexTestMigration.up();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookModule, TypeOrmModule.forRoot(ormConfig())],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/books/search (GET)', () => {
    it.each(searchTestData)('%s', (params: any, resultsCount: number) => {
      const reqUrl = `/books/search?${QueryParamsUtil.normalizeQueryParams(
        params,
      )}`;
      return request(app.getHttpServer())
        .get(reqUrl)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                _source: expect.any(Object),
              }),
            ]),
          );
          expect(res.body.length).toEqual(resultsCount);
        });
    });
  });

  describe('/books (Post)', () => {
    it('/books (Post)', () => {
      return request(app.getHttpServer())
        .post('/books')
        .send({
          "title": "Ruby for Road",
          "isbn": "1932394699",
          "pageCount": 532,
          "published": {
            "$date": "2021-05-01T00:00:00.000-0700",
            "price": 423,
            "currency": "USD"
          },
          "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/black.jpg",
          "shortDescription": "The word is out: with Ruby on Rails you can build powerful Web applications easily and quickly! And just like the Rails framework itself, Rails applications are Ruby programs. That means you can   t tap into the full power of Rails unless you master the Ruby language.",
          "longDescription": "Ruby for Rails helps Rails developers achieve Ruby mastery. Each chapter deepens your Ruby knowledge and shows you how it connects to Rails. You   ll gain confidence working with objects and classes and learn how to leverage Ruby   s elegant, expressive syntax for Rails application power. And you'll become a better Rails developer through a deep understanding of the design of Rails itself and how to take advantage of it.    Newcomers to Ruby will find a Rails-oriented Ruby introduction that   s easy to read and that includes dynamic programming techniques, an exploration of Ruby objects, classes, and data structures, and many neat examples of Ruby and Rails code in action.    Ruby for Rails: the Ruby guide for Rails developers!",
          "status": "PUBLISH",
          "authors": ["David A. Black"],
          "categories": ["Web Development"]
        })
        .expect(201)
        .then((res) => {
          console.log(res.body)
        })
    })
  })

  afterAll(async () => {
    await BookIndexTestMigration.down();
    await app.close();
  });
});

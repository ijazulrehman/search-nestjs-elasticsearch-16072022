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

  afterAll(async () => {
    await BookIndexTestMigration.down();
    await app.close();
  });
});

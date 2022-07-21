import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { Repository } from "typeorm";
import { BookEntity } from "@components/book/entities/book.entity";
import { BookModule } from "@components/book/book.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormConfig } from "@database/config/ormconfig";
import { Client } from "@elastic/elasticsearch";
import { ConfigSearch } from "@services/search/config/config.search";
import { config } from "@app/config";
import { BookIndexTestMigration } from "./es-index/book.test.migration";
import { createBookFactory } from "./factories/create-Book";
import { QueryParamsUtil } from "./utils/query-params.util";

const client = new Client(ConfigSearch.searchConfig(config.ES_HOST));

describe("BookController (e2e)", () => {
  let app: INestApplication;
  let repository: Repository<BookEntity>;
  let booKIndex: BookIndexTestMigration;
  let book;

  const searchTestData = [
    [{ price: 40 }, 17],
    [{ categories: "Java" }, 30],
    [{ date: "2009-04-01", price: 40 }, 2],
    [{ date: "2011" }, 6]
  ];

  beforeAll(async () => {
    await BookIndexTestMigration.up();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookModule, TypeOrmModule.forRoot(ormConfig())]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("/books/search (GET)", () => {
    it.each(searchTestData)("%s", (params: any, resultsCount: number) => {
      const reqUrl = `/books/search?${QueryParamsUtil.normalizeQueryParams(
        params
      )}`;
      return request(app.getHttpServer())
        .get(reqUrl)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                _source: expect.any(Object)
              })
            ])
          );
          expect(res.body.length).toEqual(resultsCount);
        });
    });
  });

  describe("/books (Post)", () => {
    it("Create Book", () => {
      let bookPayload = createBookFactory();

      return request(app.getHttpServer())
        .post("/books")
        .send(bookPayload)
        .expect(201)
        .then((res) => {
          book = res.body;
          expect(book).toBeTruthy();
          expect(book.title).toEqual(bookPayload.title);
          expect(book.isbn).toEqual(bookPayload.isbn);
          expect(book.pageCount).toEqual(bookPayload.pageCount);
          expect(book.thumbnailUrl).toEqual(bookPayload.thumbnailUrl);
          expect(book.shortDescription).toEqual(bookPayload.shortDescription);
          expect(book.status).toEqual(bookPayload.status);
          expect(book.authors).toEqual(bookPayload.authors);
          expect(book.categories).toEqual(bookPayload.categories);
        });
    });
  });
  describe("/books/:id (Patch)", () => {
    let updatedBookPayload = createBookFactory();
    it("Update Book", () => {
      return request(app.getHttpServer())
        .patch(`/books/${book._id}`)
        .send(updatedBookPayload)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
          expect(res.body.title).toEqual(updatedBookPayload.title);
          expect(res.body.isbn).toEqual(updatedBookPayload.isbn);
          expect(res.body.pageCount).toEqual(updatedBookPayload.pageCount);
          expect(res.body.thumbnailUrl).toEqual(updatedBookPayload.thumbnailUrl);
          expect(res.body.shortDescription).toEqual(updatedBookPayload.shortDescription);
          expect(res.body.status).toEqual(updatedBookPayload.status);
          expect(res.body.authors).toEqual(updatedBookPayload.authors);
          expect(res.body.categories).toEqual(updatedBookPayload.categories);
        });
    });
  });

  afterAll(async () => {
    await BookIndexTestMigration.down();
    await app.close();
  });
});

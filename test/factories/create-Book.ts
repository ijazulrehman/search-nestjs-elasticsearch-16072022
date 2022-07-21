import { faker } from "@faker-js/faker";
import { CreateBookDto } from "@components/book/dto/create-book.dto";

const { name, date, datatype, finance, image, lorem, helpers } = faker;


export function createBookFactory(args: any = {}): CreateBookDto {
  return {
    title: lorem.words(),
    isbn: datatype.number(),
    pageCount: datatype.number(),
    published: {
      date: date.future(),
      price: datatype.number(),
      currency: finance.currencyCode()
    },
    thumbnailUrl: image.imageUrl(),
    shortDescription: lorem.text(),
    longDescription: lorem.text(),
    status: helpers.arrayElement(["PUBLISH", "IN REVIEW"]),
    authors: helpers.arrayElements([name.firstName(), name.firstName(), name.firstName()]),
    categories: helpers.arrayElements(["Web Development", "Mobile Development", "Design"]),
    ...args
  };
}

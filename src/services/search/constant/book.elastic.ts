export const bookIndex = {
  _index: 'book',
  _type: 'books',
};

export const bookIndexMapping = {
  properties: {
    authors: {
      type: 'text',
    },
    categories: {
      type: 'text',
    },
    isbn: {
      type: 'keyword',
    },
    longDescription: {
      type: 'search_as_you_type',
    },
    pageCount: {
      type: 'long',
    },
    date: {
      type: 'date',
    },
    currency: {
      type: 'keyword',
    },
    price: {
      type: 'long',
    },
    shortDescription: {
      type: 'search_as_you_type',
    },
    status: {
      type: 'keyword',
    },
    thumbnailUrl: {
      type: 'text',
    },
    title: {
      type: 'search_as_you_type',
    },
  },
};

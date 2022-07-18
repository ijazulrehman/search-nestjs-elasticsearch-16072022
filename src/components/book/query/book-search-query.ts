export class BookSearchQuery {
  public static normalizeQuery(obj: any, queryKey: string, dateKey): any {
    const query = {
      bool: {
        must: [],
        filter: [],
      },
    };

    Object.keys(obj).forEach((key) => {
      switch (key) {
        case queryKey: {
          query.bool.must.push({
            multi_match: {
              [key]: obj[key],
              type: 'best_fields',
              fields: [
                'title',
                'longDescription',
                'longDescription._2gram',
                'longDescription._3gram',
                'shortDescription',
                'shortDescription._2gram',
                'shortDescription._3gram',
              ],
            },
          });
          break;
        }
        case dateKey: {
          /^\d{4}$/.test(obj[key])
            ? query.bool.filter.push({
                range: {
                  date: {
                    gte: `${obj[key]}||/y`,
                    lte: `${obj[key]}||/y`,
                    format: 'yyyy',
                  },
                },
              })
            : query.bool.filter.push({
                range: {
                  date: {
                    gte: obj[key],
                    lte: obj[key],
                  },
                },
              });
          break;
        }
        default: {
          query.bool.must.push({
            match: {
              [key]: obj[key],
            },
          });
          break;
        }
      }
    });

    return query;
  }
}

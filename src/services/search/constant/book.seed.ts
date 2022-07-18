import axios from 'axios';
import { v4 } from 'UUID';
export class SeedBookIndex {
  public static async getSeedingDate(url: string): Promise<any> {
    return await axios
      .get(url)
      .then((res) =>
        res.data.map((d) => {
          const { $date: date, ...pubProps } = d.published;
          return { ...d, published: { ...pubProps, date }, _id: v4() };
        }),
      )
      .catch((e) => e.response.data);
  }
}

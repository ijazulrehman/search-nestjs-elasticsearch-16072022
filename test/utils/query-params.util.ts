export class QueryParamsUtil {
  public static normalizeQueryParams(params: any): any {
    return Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&');
  }
}

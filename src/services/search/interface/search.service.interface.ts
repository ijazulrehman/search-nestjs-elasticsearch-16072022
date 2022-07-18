export interface SearchServiceInterface<T> {
  checkIndex(index: T): Promise<T>;

  createIndex(indicesCreate: T): Promise<T>;

  insertIndex(bulkData: T): Promise<T>;

  updateIndex(updateData: T): Promise<T>;

  searchIndex(searchData: T): Promise<T>;

  deleteIndex(indexData: T): Promise<T>;

  deleteDocument(indexData: T): Promise<T>;
}

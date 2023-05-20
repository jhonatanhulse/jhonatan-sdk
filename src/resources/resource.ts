export interface Resource<T> {
  readonly docs: Array<T>;
  readonly total: number;
  readonly page?: number;
  readonly pages?: number;
}

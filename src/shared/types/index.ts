export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

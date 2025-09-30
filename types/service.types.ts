export type ServiceResponse<T> = Promise<
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    }
>;

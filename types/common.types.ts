export type Option = CommonOption | CarFilterOption | CarFilterImageOption;

export type CommonOption = {
  id: string;
  name: string;
};

export type CarFilterOption = {
  name: string;
  count: number;
};

export type CarFilterImageOption = CarFilterOption & {
  image: string;
};

// ----------------------------------------------------------------------

export type PaginationParams<T> = T & {
  page: number;
  pageSize: number;
};

export type PaginationResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

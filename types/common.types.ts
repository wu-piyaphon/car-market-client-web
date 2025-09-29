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

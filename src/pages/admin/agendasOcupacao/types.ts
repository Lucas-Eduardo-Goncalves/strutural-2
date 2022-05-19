import moment from 'moment';

type Option = {
  value: string;
  label: string;
};

type IPaginationParams = {
  current: number;
  pageSize: number;
};

type IDependences = {
  cidades: Option[];
};

type IFilters = {
  createdAt?: [moment.Moment, moment.Moment];
  categoryId?: string;
  status?: any;
  search: string;
};

type IParams = {
  pagination: IPaginationParams;
  sort: {
    field: string;
    order: 'descend' | 'ascend';
  };
  filters: IFilters;
};

export type {
  Option,
  IPaginationParams,
  IDependences,
  IFilters,
  IParams,
}

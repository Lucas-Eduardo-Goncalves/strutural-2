import { IFilters, IPaginationParams } from './types';

export const pageSizeOptions = ['10', '30', '50'];

export const defaultPaginationParams: IPaginationParams = {
  current: 1,
  pageSize: Number(pageSizeOptions[0]),
};

export const defaultFilters: IFilters = {
  createdAt: undefined,
  categoryId: undefined,
  search: '',
  status: undefined,
};

import moment from 'moment';

export type Option = {
  value: string;
  label: string;
};

export declare type SortOrder = 'descend' | 'ascend' | null;

export type IPaginationParams = {
  current: number;
  pageSize: number;
};

export type IPaginationResult = {
  total: number;
};

export type IDependences = {
  cidades: Option[];
  escolaesferas: Option[];
  escolagraus: Option[];
};

export type IRowData = {
  key: string;
  name: string;
  phone: string;
  sankhya_login: string;
  sankhya_pass: string;
  password: string;
  isActive: number;
  email: string;
  lastViewed: moment.Moment,
  createdAt: moment.Moment;
};

export type IFormData = {
  name: string;
  phone: string;
  sankhya_login: string;
  sankhya_pass: string;
  password: string;
  isActive: number;
  email: string;
 
  createdAt: moment.Moment;
};

export type IFormDataErrors = any;

export type IFilters = {
  createdAt?: [moment.Moment, moment.Moment];
  status?: any;
  search: string;
};

export type IParams = {
  pagination: IPaginationParams;
  sort: {
    field: string;
    order: 'descend' | 'ascend';
  };
  filters: IFilters;
};

export type ISelectedData = {
  keys: string[];
  data: IRowData[];
};

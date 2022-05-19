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
 };

export type IRowData = {
  key: string;
 
  profissional_name: string;
  CPF: string;
  phone: string;
  olinda_id: number;
  boavista_id: number;
  paulista_id: number;
  pina_id: number;
  last_viewed: moment.Moment;
 
  createdAt: moment.Moment;
};

export type IExtras = any;


export type IFormData = {
  profissional_name: string;
  CPF: string;
  phone: string;
 
  
};

export type IFormDataErrors = any;

export type IFilters = {
  unidadeId?: number,
  createdAt?:[moment.Moment, moment.Moment];
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

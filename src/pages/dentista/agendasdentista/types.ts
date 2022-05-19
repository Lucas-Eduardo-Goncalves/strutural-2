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
  unidades: Option[];
  
};

export type IRowData = {
  key: string;
 
  data_consulta: string;
  hora: string;
  nome_paciente: string;
  status: string;
  profissional_id: number;
  procedimento_id: number;
  unidade_id: number;
  created_at: moment.Moment;
};

export type IExtras = any;


export type IFormData = {
  data_consulta: string;
  hora: string;
  nome_paciente: string;
  status: string;
  profissional_id: number;
  procedimento_id: number;
  unidade_id: number;
  
};

export type IFormDataErrors = any;

export type IFilters = {
  data_consulta?: moment.Moment;
  unidadeId?: string;
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

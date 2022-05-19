import { SortOrder } from 'antd/lib/table/interface';
import { IFilters, IFormData, IPaginationParams } from './types';

export const pageSizeOptions = ['10', '30', '50'];

export const initialEmptyFormData: IFormData = {
  data_consulta: '',
  hora: '',
  status: '',
  nome_paciente: '',
  profissional_id: 1,
  procedimento_id: 1,
  unidade_id: 1,
 
  
  
};

export const defaultColumnProps = {
  sorter: true,
  filterMultiple: false,
  sortDirections: ['descend', 'ascend'] as SortOrder[],
};

export const defaultPaginationParams: IPaginationParams = {
  current: 1,
  pageSize: Number(pageSizeOptions[0]),
};

export const defaultFilters: IFilters = {
  data_consulta: undefined,
  unidadeId: undefined,
  search: '',
  status: undefined,
};

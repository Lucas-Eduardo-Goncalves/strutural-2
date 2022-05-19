import { SortOrder } from 'antd/lib/table/interface';
import moment from 'moment';
import { IFilters, IFormData, IPaginationParams } from './types';

export const pageSizeOptions = ['10', '30', '50'];

export const initialEmptyFormData: IFormData = {
 
  name: '',
  phone: '',
  sankhya_pass: '',
  sankhya_login: '',
  password:'',
  email: '',
  isActive: 1,
  
  createdAt:moment(),
  
  
  
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
  createdAt: undefined,
  
  search: '',
  status: undefined,
};

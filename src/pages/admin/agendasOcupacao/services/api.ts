import { api } from "../../../../services/api";
import moment from 'moment';
import { IParams } from '../types';

const token = localStorage.getItem("whatsapp-token");

export const getData = async (params: IParams, status: any) => {
  const format = (date?: moment.Moment) => (date ? date.format('YYYY-MM-DD') : '');

  const getBeetweenDate = ([date1, date2]: [moment.Moment, moment.Moment]) => {
    return `${format(date1)},${format(date2)}`;
  };
 
  let sortByOrder = "";
    if(params.sort.order === 'descend') {
      sortByOrder = `${params.sort.field}:${params.sort.order === 'descend'? 'DESC' : params.sort.order}` 
    }
    if(params.sort.order === 'ascend') {
      sortByOrder = `${params.sort.field}:${params.sort.order === 'ascend'? 'ASC' : params.sort.order}` 
    }

  let statusVar = 0;
    if(status === 'Inativos') {
      statusVar = 0;
    } else {
      statusVar =1;
    }

  const filters = {
    'filter[created_between]': params.filters.createdAt ? getBeetweenDate(params.filters.createdAt) : undefined,
    'search': params.filters.search || undefined,
    'filter.categoryId': params.filters.categoryId || undefined,
    'filter.status': statusVar,
    limit: params.pagination.pageSize,
    page: params.pagination.current,
    sortBy: sortByOrder,
    order:params.sort.order || undefined,
  };

  const parsedQueryFilters = JSON.parse(JSON.stringify(filters));

  if(token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }

  const { data } = await api.get('admin/ocupacao', {
    params: parsedQueryFilters,
  });

  return {
    data,
    size: data.total,
  };
};
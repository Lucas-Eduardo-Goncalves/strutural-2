import { api } from "../../../../services/api";
import moment from 'moment';
import { IFormData, IParams, IRowData, ISelectedData } from '../types';

const token = localStorage.getItem("whatsapp-token");



export const getData = async (params: IParams, status: any) => {
  const format = (date?: moment.Moment) => (date ? date.format('YYYY-MM-DD') : '');

  const getBeetweenDate = ([date1, date2]: [moment.Moment, moment.Moment]) => {
    return `${format(date1)},${format(date2)}`;
  };
 
  let sortByOrder;
    if(params.sort.order === 'descend'){
       sortByOrder = `${params.sort.field}:${params.sort.order === 'descend'? 'DESC' : params.sort.order}` 
    }
    if(params.sort.order === 'ascend'){
       sortByOrder = `${params.sort.field}:${params.sort.order === 'ascend'? 'ASC' : params.sort.order}` 
    }

    let statusVar;
    if(status==='Inativos'){
      statusVar = 0;
    }else{
      statusVar =1;
    }

  const filters = {
    'filter[created_between]': params.filters.createdAt ? getBeetweenDate(params.filters.createdAt) : undefined,
    'search': params.filters.search || undefined,
    'filter[unidade_id]': params.filters.unidadeId || undefined,
    'filter.status': statusVar, //params.filters.status === undefined ? undefined : params.filters.status,
    limit: params.pagination.pageSize,
    page: params.pagination.current,
    sortBy:sortByOrder,
    order:params.sort.order || undefined,
    //status: status,
  };
  console.log(status);

  const parsedQueryFilters = JSON.parse(JSON.stringify(filters));

  if(token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
  const response = await api.get('admin/dentistas', {
    params: parsedQueryFilters,
  });

  const data = response.data.data.data.map(
    (d: any) =>
      ({
        key: String(d.id),
        profissional_name: d.profissional_name || '',
        CPF: d.CPF || '',
        phone: d.phone || '',
        olinda_id: d.olinda_id || '',
        boavista_id: d.boavista_id || '',
        paulista_id: d.paulista_id || '',
        pina_id: d.pina_id || '',
        last_viewed: d.last_viewed || '',
        createdAt: d.created_at || '',
       
      } as IRowData),
  );

  const extra = response.data;

  return {
    data,
    extra,
    size: response.data.total,
  };
};

export const getDependences = async () => {
  const listAll = { limit: 100, page: 1 };

  const [cidadesResponse] = await Promise.all([
    api.get('dentista/unidades', { params: listAll })
   
  ]);

  const cidades = cidadesResponse.data.data.data.map((c: any) => ({
    value: String(c.id),
    label: c.name,
  }));


  
  

  return {
    cidades
   
  };
};

export const createData = async (params: IFormData) => {
  await api.post('api/v1/escolas', params);
};

export const updateData = async (key: string, params: IFormData) => {
  await api.put('api/v1/escolas/'+key, params);
};

export const deleteData = async (params: ISelectedData) => {
  
    return await api.post('/api/v1/escolas/', {
       data: params.keys.map(id => ({ id })) ,
    });
  
};

export const deleteDataOne = async (key: string) => {
  await api.delete('/api/v1/escolas/'+key);
};

export const restoreDataOne = async (key: string) => {
  await api.put('/api/v1/escolas/restore/'+key);
};
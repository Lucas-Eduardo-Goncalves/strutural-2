import axios from 'axios';
import moment from 'moment';
import { IFormData, IParams, IRowData, ISelectedData } from '../types';

const api = axios.create({
  baseURL: 'https://gestorapi.webi9.com.br/',
/*   headers: {
    authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5jb21wcmFiYWthbmEuY29tLmJyL3B1YmxpYy9hcGkvbG9naW4iLCJpYXQiOjE2MTg0MTk2MzgsIm5iZiI6MTYxODQxOTYzOCwianRpIjoiOWlzRGpqWnlId0hndHE4UiIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.D8WiJ19BIc0ldcVGaZdDfnPvnoBfaiR9hIR4N4uogNQ',
  }, */
});

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
    if(status==='Lixeira'){
      statusVar = 0;
    }else{
      statusVar =1;
    }



  const filters = {
    'filter.createdAt': params.filters.createdAt ? getBeetweenDate(params.filters.createdAt) : undefined,
    'search': params.filters.search || undefined,
    'filter.idCidade': params.filters.idCidade || undefined,
    'filter.status': statusVar, //params.filters.status === undefined ? undefined : params.filters.status,
    limit: params.pagination.pageSize,
    page: params.pagination.current,
    sortBy:sortByOrder,
    order:params.sort.order || undefined,
    //status: status,
  };
  console.log(status);

  const parsedQueryFilters = JSON.parse(JSON.stringify(filters));

  const response = await api.get('api/v1/cidades', {
    params: parsedQueryFilters,
  });

  const data = response.data.data.map(
    (d: any) =>
      ({
        key: String(d.id),
        nome: d.nome || '',
        uf: d.uf || '',
        sigla: d.sigla || '',
        status: d.status || '',
        createdAt: d.createdAt || '',
       
      } as IRowData),
  );

  return {
    data,
    size: response.data.total,
  };
};

export const getDependences = async () => {
  const listAll = { limit: 100, page: 1 };

  const [cidadesResponse, addonsResponse] = await Promise.all([
    api.get('api/v1/cidades', { params: listAll }),
    api.get('api/v1/cidades', { params: listAll }),
  ]);

  const cidades = cidadesResponse.data.data.map((c: any) => ({
    value: String(c.id),
    label: c.nome,
  }));

  const addons = addonsResponse.data.data.map((a: any) => ({
    value: String(a.id),
    label: a.nome,
  }));

  return {
    cidades,
    addons,
  };
};

export const createData = async (params: IFormData) => {
  await api.post('api/v1/cidades', params);
};

export const updateData = async (key: string, params: IFormData) => {
  await api.put('api/v1/cidades/'+key, params);
};

export const deleteData = async (params: ISelectedData) => {
  
    return await api.post('/api/v1/cidades/', {
       data: params.keys.map(id => ({ id })) ,
    });
  
};

export const deleteDataOne = async (key: string) => {
  await api.delete('/api/v1/cidades/'+key);
};

export const restoreDataOne = async (key: string) => {
  await api.put('/api/v1/cidades/restore/'+key);
};
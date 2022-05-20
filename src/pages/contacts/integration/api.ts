import { api } from "../../../services/api";
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
  /*   'filter.categoryId': params.filters.categoryId || undefined, */
    'filter.status': statusVar, //params.filters.status === undefined ? undefined : params.filters.status,
    limit: params.pagination.pageSize,
    page: params.pagination.current,
    sortBy:sortByOrder,
    order:params.sort.order || undefined,
    //status: status,
  };

  const parsedQueryFilters = JSON.parse(JSON.stringify(filters));

  if(token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }

  const response = await api.get('users', {
    params: parsedQueryFilters,
  });
  console.log(response.data.data);

  const data = response.data.data.data.map(
    (d: any) =>
      ({
        key: String(d.id),
        name: d.name || '',
        phone: d.phone || '',
        sankhya_login: d.sankhya_login || '',
        sankhya_pass: d.sankhya_pass || '',
        isActive: d.is_active,
        lastViewed: d.last_viewed || '',
        email: d.email || '',
        createdAt: d.created_at || '',
       
      } as IRowData),
  );

  return {
    data,
    size: response.data.total,
  };
};

export const getDependences = async () => {
  const listAll = { limit: 100, page: 1 };

  const [cidadesResponse, escolaesferasResponse, escolagrausResponse] = await Promise.all([
    api.get('api/v1/alunos', { params: listAll }),
    api.get('api/v1/escolaesferas', { params: listAll }),
    api.get('api/v1/escolagraus', { params: listAll }),
  ]);

  const cidades = cidadesResponse.data.data.map((c: any) => ({
    value: String(c.id),
    label: c.nome,
  }));

  const escolaesferas = escolaesferasResponse.data.data.map((a: any) => ({
    value: String(a.id),
    label: a.esfera,
  }));

  const escolagraus = escolagrausResponse.data.data.map((a: any) => ({
    value: String(a.id),
    label: a.grau,
  }));

  return {
    cidades,
    escolaesferas,
    escolagraus,
  };
};

export const createData = async (params: IFormData) => {
  await api.post('users', params);
};

export const updateData = async (key: string, params: IFormData) => {
  await api.put('users/'+key, params);
};

export const deleteData = async (params: ISelectedData) => {
  
    return await api.post('/api/v1/escolas/', {
       data: params.keys.map(id => ({ id })) ,
    });
  
};

export const deleteDataOne = async (key: string) => {
  await api.delete('/users/'+key);
};

export const restoreDataOne = async (key: string) => {
  await api.put('/users/restore/'+key);
};
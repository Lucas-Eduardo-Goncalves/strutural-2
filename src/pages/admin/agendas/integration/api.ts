
import moment from 'moment';
import { api } from '../../../../services/api';
import { IFormData, IParams, IRowData, ISelectedData } from '../types';

const token = localStorage.getItem("whatsapp-token");


export const getData = async (params: IParams, status: any) => {
  const format = (date?: moment.Moment) => (date ? date.format('YYYY-MM-DD') : '');

  const getBeetweenDate = (date1: moment.Moment) => {
    return `${format(date1)}`;
  };
 
  let sortByOrder;
    if(params.sort.order === 'descend'){
       sortByOrder = `${params.sort.field}:${params.sort.order === 'descend'? 'DESC' : params.sort.order}` 
    }
    if(params.sort.order === 'ascend'){
       sortByOrder = `${params.sort.field}:${params.sort.order === 'ascend'? 'ASC' : params.sort.order}` 
    }

    let statusVar;
    if(status==='Marcado'){
      statusVar = 'marcado';
    }
    if(status==='Cancelado'){
      statusVar = 'cancelado';
    }
    if(status==='Presente'){
      statusVar = 'presente';
    }

  const filters = {
    'filter[data]': params.filters.data_consulta ? getBeetweenDate(params.filters.data_consulta) : moment().format('YYYY-MM-DD'),
    'search': params.filters.search || undefined,
    'filter[unidade_id]': params.filters.unidadeId || undefined,
    'filter[profissional_id]': params.filters.profissional_id || undefined,
    'filter[status]': statusVar, //params.filters.status === undefined ? undefined : params.filters.status,
    limit: params.pagination.pageSize,
    page: params.pagination.current,
    sortBy:sortByOrder,
    order:params.sort.order || undefined,
    //status: status,
  };
 // console.log(status);

  const parsedQueryFilters = JSON.parse(JSON.stringify(filters));
  if(token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
  const response = await api.get('admin/relatorio-agendamentos', {
    params: parsedQueryFilters,
  });

  //console.log(response);

  const data = response.data.data.data.map(
    (d: any) =>
      ({
        key: String(d.id),
        data_consulta: d.data || '',
        hora: d.hora || '',
        nome_paciente: d.nome_paciente || '',
        status: d.status || '',
        procedimento_id: d.procedimento_id || undefined,
        profissional_id: d.profissional_id || undefined,

        unidade_id: d.unidade_id || undefined,

        created_at: d.created_at || '',
       
      } as IRowData),
  );



  const extra = response.data;

  return {
    data,
   extra,
    size: response.data.data.total,
  };
};

export const getDependences = async () => {
  const listAll = { limit: 100, page: 1 };

  const [unidadesResponse] = await Promise.all([
    api.get('dentista/unidades', { params: listAll })
   
  ]);

  const unidades = unidadesResponse.data.data.data.map((c: any) => ({
    value: String(c.id),
    label: c.name,
  }));


  const [dentistasResponse] = await Promise.all([
    api.get('admin/dentistas', { params: listAll })
   
  ]);

  const dentistas = dentistasResponse.data.data.data.map((c: any) => ({
    value: String(c.id),
    label: c.name,
  }));


  return {
    unidades,
    dentistas,
  
  };
};

export const createData = async (params: IFormData) => {
  await api.post('api/v1/agendasdentistas', params);
};

export const updateData = async (key: string, params: IFormData) => {
  await api.put('api/v1/agendasdentistas/'+key, params);
};

export const deleteData = async (params: ISelectedData) => {
  
    return await api.post('/api/v1/agendasdentistas/', {
       data: params.keys.map(id => ({ id })) ,
    });
  
};

export const deleteDataOne = async (key: string) => {
  await api.delete('/api/v1/agendasdentistas/'+key);
};

export const restoreDataOne = async (key: string) => {
  await api.put('/api/v1/agendasdentistas/restore/'+key);
};
import moment from 'moment';
import { IFormData, IParams, IRowData, ISelectedData, Option } from '../types';

const cidades: Option[] = [{ value: '1', label: 'Cidade 1' }];
const agendasdentistaesferas: Option[] = [];
const agendasdentistagraus: Option[] = [];

let mockData: IRowData[] = [
  {
    key: '1',
    data_consulta: 'Produto 1',
    hora: 'Descricao',
    status: 'idEsfera',
    nome_paciente: 'idEsfera',
    profissional_id: 1,
    procedimento_id: 1,
    unidade_id: 1,
    created_at: moment(),
   
    
   
  },
];

const freeze = () => new Promise(resolve => setTimeout(resolve, 2000));

export const getData = async (params: IParams) => {
  console.log('getData', params);
  await freeze();
  return {
    data: mockData,
    size: 10000,
  };
};

export const getDependences = async () => {
  await freeze();
  return { cidades, agendasdentistaesferas, agendasdentistagraus };
};

export const createData = async (params: IFormData) => {
  await freeze();
  mockData.push({
    key: Math.random().toString(),
    ...params,
    data_consulta: '',
  } as IRowData);
};

export const updateData = async (key: string, params: IFormData) => {
  console.log('updateData', params);
  await freeze();
  const itemIndex = mockData.findIndex(d => d.key === key);
  if (itemIndex < 0) throw new Error('Item not found');
  Object.assign(mockData[itemIndex], params);
};

export const deleteData = async (params: ISelectedData) => {
  console.log('deleteData', params);
  await freeze();
  mockData = mockData.filter(d => !params.keys.includes(d.key));
};

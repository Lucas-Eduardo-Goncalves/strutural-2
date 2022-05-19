import React, { useState, useEffect } from 'react';
import { notification, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table/interface';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as api from '../integration';
import { IRowData, IExtras,  IParams, ISelectedData, IPaginationResult, IFormData, IFilters, IDependences } from '../types';
import { NavLink, useRouteMatch } from 'react-router-dom';

import { defaultColumnProps, defaultFilters, defaultPaginationParams } from '../empty-data';
import { Button } from '../../../../components/buttons/buttons';
import { useModal } from '../../../../hooks/useModal';


const MaxWidthColumn: React.FC<{ width: number }> = ({ width, children }) => (
  <div style={{ maxWidth: width, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{children}</div>
);

export const useTable = () => {
  const [data, setData] = useState<IRowData[]>([]);
  const [extra, setExtra] = useState<IExtras>([]);
  const [selectedData, setSelectedData] = useState<ISelectedData>({ keys: [], data: [] });
  const { path } = useRouteMatch();
  const [dependences, setDependences] = useState<IDependences>({ unidades: [], dentistas: [] });

  const [updateTable, setUpdateTable] = useState(false);
  const forceUpdate = () => setUpdateTable(prev => !prev);

  const filtersModal = useModal();
  const confirmDeleteModal = useModal<ISelectedData>();
  const confirmDeleteOneModal = useModal<IRowData>();
  const confirmRestoreOneModal = useModal<IRowData>();
  const newDataModal = useModal();
  const dataToEditModal = useModal<IRowData>();

  const [listLoading, setListLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(false);
  const [statusSelected, setStatusSelected] = useState('Ativos');
  
  const [params, setParams] = useState<IParams>({
    pagination: {
      ...defaultPaginationParams,
    },
    sort: {
      field: '',
      
      order: 'descend',
    },
    filters: {
      ...defaultFilters,
    },
  });

  const filterKey = ['Marcado', 'Cancelado', 'Presente'];

  const [paginationResult, setPaginationResult] = useState<IPaginationResult>({
    total: 0,
  });

console.log( moment().format('YYYY-MM-DD'));
  
  const handleChangeForFilter = (e: any) => {
    setStatusSelected(e.target.value);

  };



  const columns: ColumnsType<IRowData> = [
    {
      title: 'Data',
      dataIndex: 'data_consulta',
      render: (_, row: IRowData) => <MaxWidthColumn width={180}>{(row.data_consulta ? moment(row.data_consulta).format('DD/MM/YYYY') : '---')}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
    {
      title: 'Hora',
      dataIndex: 'hora',
      render: (_, row: IRowData) => <MaxWidthColumn width={180}>{row.hora}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
    {
      title: 'Nome Paciente',
      dataIndex: 'nome_paciente',
      render: (_, row: IRowData) => <MaxWidthColumn width={180}>{row.nome_paciente}</MaxWidthColumn>,
      ...defaultColumnProps,
    },

    {
      title: 'Unidade',
      dataIndex: 'corporateName',
      render: (_, row: IRowData) => 
      
      { {
        if (row.unidade_id==1) {
          return (
            <MaxWidthColumn width={180}>  <span style={{
              color: '#20C9A5',
              background:  '#E2F4F0' ,
              border: `0px solid ${'#b7eb8f'}`,
              padding: '3px 10px',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems:'center',
              textAlign:'center',
              boxSizing: 'border-box',
              fontVariant: 'tabular-nums',
              listStyle: 'none',
              fontFeatureSettings: 'tnum',
              display: 'inline-block',
              height: 'auto',
              fontSize: '12px',
              lineHeight: '20px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
              
            }}>
              Olinda
            </span></MaxWidthColumn>
          )
        } else if (row.unidade_id==2) {
          return (
            <MaxWidthColumn width={180}>  <span style={{
              color: '#396dd6',
              background:  '#d3e2ff' ,
              border: `0px solid ${'#d3e2ff'}`,
              padding: '3px 10px',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems:'center',
              textAlign:'center',
              boxSizing: 'border-box',
              fontVariant: 'tabular-nums',
              listStyle: 'none',
              fontFeatureSettings: 'tnum',
              display: 'inline-block',
              height: 'auto',
              fontSize: '12px',
              lineHeight: '20px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
              
            }}>
              Boa Vista
            </span></MaxWidthColumn>
          )
        } else  if (row.unidade_id==3) {
          return (
            <MaxWidthColumn width={180}>  <span style={{
              color: '#d8ae3a',
              background:  '#f4eacd' ,
              border: `0px solid ${'#f4eacd'}`,
              padding: '3px 10px',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems:'center',
              textAlign:'center',
              boxSizing: 'border-box',
              fontVariant: 'tabular-nums',
              listStyle: 'none',
              fontFeatureSettings: 'tnum',
              display: 'inline-block',
              height: 'auto',
              fontSize: '12px',
              lineHeight: '20px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
              
            }}>
              Paulista
            </span></MaxWidthColumn>
          )
        }else  if (row.unidade_id==4) {
          return (
            <MaxWidthColumn width={180}>  <span style={{
              color: '#e5374e',
              background:  '#f4bcc3' ,
              border: `0px solid ${'#f4bcc3'}`,
              padding: '3px 10px',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems:'center',
              textAlign:'center',
              boxSizing: 'border-box',
              fontVariant: 'tabular-nums',
              listStyle: 'none',
              fontFeatureSettings: 'tnum',
              display: 'inline-block',
              height: 'auto',
              fontSize: '12px',
              lineHeight: '20px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
              
            }}>
              Pina
            </span></MaxWidthColumn>
          )
        }
      }},
      ...defaultColumnProps,
    },
    
    
  
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, row: IRowData) => 
        { {
          if (row.status=='marcado') {
            return (
              <MaxWidthColumn width={180}>  <span style={{
                color: '#20C9A5',
                background:  '#E2F4F0' ,
                border: `0px solid ${'#b7eb8f'}`,
                padding: '3px 10px',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems:'center',
                textAlign:'center',
                boxSizing: 'border-box',
                fontVariant: 'tabular-nums',
                listStyle: 'none',
                fontFeatureSettings: 'tnum',
                display: 'inline-block',
                height: 'auto',
                fontSize: '12px',
                lineHeight: '20px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                
              }}>
                Marcado
              </span></MaxWidthColumn>
            )
          } else if (row.status=='confirmado') {
            return (
              <MaxWidthColumn width={180}>  <span style={{
                color: '#396dd6',
                background:  '#d3e2ff' ,
                border: `0px solid ${'#d3e2ff'}`,
                padding: '3px 10px',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems:'center',
                textAlign:'center',
                boxSizing: 'border-box',
                fontVariant: 'tabular-nums',
                listStyle: 'none',
                fontFeatureSettings: 'tnum',
                display: 'inline-block',
                height: 'auto',
                fontSize: '12px',
                lineHeight: '20px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                
              }}>
                Confirmado
              </span></MaxWidthColumn>
            )
          }else if (row.status=='presente') {
            return (
              <MaxWidthColumn width={180}>  <span style={{
                color: '#d8ae3a',
                background:  '#f4eacd' ,
                border: `0px solid ${'#f4eacd'}`,
                padding: '3px 10px',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems:'center',
                textAlign:'center',
                boxSizing: 'border-box',
                fontVariant: 'tabular-nums',
                listStyle: 'none',
                fontFeatureSettings: 'tnum',
                display: 'inline-block',
                height: 'auto',
                fontSize: '12px',
                lineHeight: '20px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                
              }}>
                Presente
              </span></MaxWidthColumn>
            )
          }else if (row.status=='cancelado') {
            return (
              <MaxWidthColumn width={180}>  <span style={{
                color: '#e5374e',
                background:  '#f4bcc3' ,
                border: `0px solid ${'#f4bcc3'}`,
                padding: '3px 10px',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems:'center',
                textAlign:'center',
                boxSizing: 'border-box',
                fontVariant: 'tabular-nums',
                listStyle: 'none',
                fontFeatureSettings: 'tnum',
                display: 'inline-block',
                height: 'auto',
                fontSize: '12px',
                lineHeight: '20px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                
              }}>
                Presente
              </span></MaxWidthColumn>
            )
          }
        }}
        
         ,
      ...defaultColumnProps,
    }, 

  
  
   /*  {
      title: 'Ações',
      key: 'action',
      render: (_, row) => (
        <div className="table-actions">
          {statusSelected === 'Inativos' ? (
            <Button className="btn-icon" type="info" onClick={() => confirmRestoreOneModal.open(row)} to="#" shape="circle">
              <FeatherIcon icon="refresh-ccw" size={16} />
            </Button>
          ):(
            <>
              <Button className="btn-icon" type="info" onClick={() => dataToEditModal.open(row)} to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>

              
              <Button className="btn-icon" type="danger" onClick={() => confirmDeleteOneModal.open(row)} to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </>
          )}
        </div>
      ),
    },*/
  ]; 

  useEffect(() => {
    setListLoading(true);
    api
      .getData(params, statusSelected)
      .then(response => {
        setData(response.data);
        setExtra(response.extra);
        setPaginationResult({ total: response.size });
        
      })
      .finally(() => setListLoading(false));
  }, [params, updateTable, statusSelected]);

  useEffect(() => {
    setListLoading(true);
    api
      .getDependences()
      .then(setDependences)
      .finally(() => setListLoading(false));
  }, []);

  function handleCreate(dataToInsert: IFormData) {
    setActionLoading(true);
    api
      .createData(dataToInsert)
      .then(() => {
        newDataModal.close();
        forceUpdate();
        notification.open({
          message: 'Dados inseridos com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao salvar os dados',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  }

  function handleUpdate(key: string, updatedData: IFormData) {
    setActionLoading(true);
    api
      .updateData(key, updatedData)
      .then(() => {
        dataToEditModal.close();
        forceUpdate();
        notification.open({
          message: 'Dados atualizados com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao atualizar os dados',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  }

   function handleDeleteOne(key:string) {
    setActionLoading(true);
    api
      .deleteDataOne(key)
      .then(() => {
        confirmDeleteOneModal.close();
        forceUpdate();
        notification.open({
          message: 'Dados deletados com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao deletar este item',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  } 

  function handleRestoreOne(key:string) {
    setActionLoading(true);
    api
      .restoreDataOne(key)
      .then(() => {
        confirmRestoreOneModal.close();
        forceUpdate();
        notification.open({
          message: 'Registro restaurado com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao restaurar este item',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  } 



  function handleDelete() {
    setActionLoading(true);
    api
      .deleteData(selectedData)
      .then(() => {
        confirmDeleteModal.close();
        setSelectedData({ keys: [], data: [] });
        forceUpdate();
        notification.open({
          message: 'Dados deletados com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao deletar dados',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  }

  function handleChangeParams(pagination: TablePaginationConfig, _filters: any, sorter: any) {
    setParams(prev => ({
      ...prev,
      pagination: {
        current: pagination.current || defaultPaginationParams.current,
        pageSize: pagination.pageSize || defaultPaginationParams.pageSize,
      },
      sort: {
        field: typeof sorter.field === 'string' ? sorter.field : '',
        
        order: sorter.order,
      },
    }));
  }

  function handleUpdateFilters(filters: IFilters) {
    setParams(prev => ({ ...prev, filters }));
    setShowFilterButton(true);
    filtersModal.close();
  }

  function handleClearFilters() {
    setParams(prev => ({ ...prev, filters: { ...defaultFilters } }));
    setShowFilterButton(false);
    filtersModal.close();
  }

  function handleSearch(search: string) {
    setParams(prev => ({ ...prev, filters: { ...prev.filters, search } }));
  }

  return {
    data,
    extra,
    dependences,
    selectedData,
    setSelectedData,
    showFilterButton,
    columns,
    params,
    paginationResult,
    statusSelected,
    filterKey,

    listLoading,
    actionLoading,

    handleCreate,
    handleUpdate,
    handleDelete,
    handleDeleteOne,
    handleRestoreOne,
    handleChangeParams,
    handleClearFilters,
    handleUpdateFilters,
    handleChangeForFilter,
    handleSearch,

    filtersModal,
    confirmDeleteModal,
    confirmDeleteOneModal,
    confirmRestoreOneModal,
    newDataModal,
    dataToEditModal,
  };
};

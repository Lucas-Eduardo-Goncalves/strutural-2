import React from "react";
import { Table as AntdTable } from "antd";
import toast from "react-hot-toast";

import { IFetchPropsContacts } from "../../types";
import { api } from "../../../../services/api";
import { TableColumnController } from "./tableColumnController";

interface ITableComponentProps {
  dataFetch?: IFetchPropsContacts;
  isLoading: boolean;
  refetch: () => void;
}

export function TableComponent({ refetch, dataFetch, isLoading }: ITableComponentProps) {
  const pageSizeOptions = ['10', '30', '50'];

  async function handleDeleteFunction(contactId: string) {
    try {
      await api.delete(`/contacts/${contactId}`);
      toast.success("Deletado com sucesso");
    } catch(err) {
      toast.error("Não foi possivel deletar");
      console.log(err)
    }
    refetch();
  }

  const { columns } = TableColumnController({ handleDeleteFunction, refetch });

  return (
    <AntdTable
      loading={isLoading}
      showSorterTooltip={false}
      rowSelection={{  }}
      dataSource={dataFetch}
      columns={columns}
      pagination={{ 
        // ...params.pagination, 
        // ...paginationResult, 
        pageSizeOptions, 
        showSizeChanger: true 
      }}
    />
  );
}

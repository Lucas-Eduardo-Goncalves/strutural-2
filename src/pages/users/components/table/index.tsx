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
  currentPage: number;
}

export function TableComponent({ refetch, dataFetch, isLoading, currentPage }: ITableComponentProps) {
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

  const filters = [
    { content: "0", key: "isActive" }
  ]

  console.log(filters[0].key + ":" + filters[0].content)

  function handle(event: number) {
    console.log(event)
  }

  return (
    <AntdTable
      loading={isLoading}
      showSorterTooltip={false}
      rowSelection={{  }}
      dataSource={dataFetch}
      columns={columns}
      pagination={{ 
        current: currentPage,
        onChange: handle,
        pageSize: 10,
        pageSizeOptions,
      }}
    />
  );
}

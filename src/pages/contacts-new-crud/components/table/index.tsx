import React from "react";
import { Table as AntdTable } from "antd";
import { IFetchPropsContacts } from "../../types";
import { columns } from "./Columns";

interface ITableComponentProps {
  dataFetch?: IFetchPropsContacts;
  isLoading: boolean;
}

export function TableComponent({ dataFetch, isLoading }: ITableComponentProps) {
  const pageSizeOptions = ['10', '30', '50'];

  return (
    <AntdTable
      loading={isLoading}
      showSorterTooltip={false}
      rowSelection={{  }}
      // onChange={handleChangeParams}
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

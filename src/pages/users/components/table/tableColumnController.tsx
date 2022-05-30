import React from "react";
import moment from "moment";
import { ColumnsType } from "antd/lib/table";


import { IUserProps } from "../../types";
import { SortOrder } from "../../../../container/pages/escolas/types";
import { TableButtonDelete } from "./TableButtonDelete";
import { TableButtonEdit } from "./TableButtonEdit";

interface ITableColumnControllerProps {
  handleDeleteFunction: (contactId: string) => Promise<void>;
  refetch: () => void;
}

export function TableColumnController({ handleDeleteFunction, refetch }: ITableColumnControllerProps) {
  const defaultColumnProps = {
    sorter: true,
    filterMultiple: false,
    sortDirections: ["descend", "ascend"] as SortOrder[],
  };
  
  const MaxWidthColumn: React.FC<{ width: number }> = ({ width, children }) => (
    <div 
      style={{ 
        maxWidth: width, 
        textOverflow: "ellipsis", 
        overflow: "hidden", 
        whiteSpace: "nowrap" 
      }}
    >
      {children}
    </div>
  );

  const columns: ColumnsType<IUserProps> = [
    {
      title: "Nome",
      dataIndex: "name",
      render: (_, row: IUserProps) => <MaxWidthColumn width={180}>{row.name}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
   
    {
      title: "E-mail",
      dataIndex: "email",
      render: (_, row: IUserProps) => <MaxWidthColumn width={180}>{row.email}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
  
    {
      title: "Data de criação",
      dataIndex: "created_at",
      render: (_, row: IUserProps) => <MaxWidthColumn width={180}>{moment(row.created_at).format("DD/MM/YYYY")}</MaxWidthColumn>,
      ...defaultColumnProps,
    }, 
  
    {
      title: "Ações",
      dataIndex: "actions",
      render: (_, row: IUserProps) => (
        <div className="table-actions">
          {/* <TableButtonEdit 
            contactId={String(row.id)} 
            refetch={refetch}
            data={row}
          /> */}

          <TableButtonDelete 
            handleDeleteFunction={handleDeleteFunction} 
            contactId={String(row.id)} 
          />
        </div>
      ),
      ...defaultColumnProps,
    }
  ];
  
  return { columns }
}

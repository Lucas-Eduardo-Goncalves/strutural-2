import React from "react";
import moment from "moment";
import { ColumnsType } from "antd/lib/table";

import FeatherIcon from "feather-icons-react";
import { IContactProps } from "../../types";
import { SortOrder } from "../../../../container/pages/escolas/types";
import { Button } from "../../../../components/buttons/buttons";

interface ITableColumnControllerProps {
  handleDeleteFunction: (contactId: string) => Promise<void>;
}

export function TableColumnController({ handleDeleteFunction }: ITableColumnControllerProps) {
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

  const columns: ColumnsType<IContactProps> = [
    {
      title: "Nome",
      dataIndex: "name",
      render: (_, row: IContactProps) => <MaxWidthColumn width={180}>{row.name}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
   
    {
      title: "E-mail",
      dataIndex: "email",
      render: (_, row: IContactProps) => <MaxWidthColumn width={180}>{row.email}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
  
    {
      title: "Data de criação",
      dataIndex: "created_at",
      render: (_, row: IContactProps) => <MaxWidthColumn width={180}>{moment(row.createdAt).format("DD/MM/YYYY")}</MaxWidthColumn>,
      ...defaultColumnProps,
    }, 
  
    {
      title: "Ações",
      dataIndex: "actions",
      render: (_, row: IContactProps) => (
        <div className="table-actions">
          <Button 
            className="btn-icon" 
            type="danger" 
            shape="circle" 
            onClick={() => handleDeleteFunction(String(row.id))}
          >
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      ),
      ...defaultColumnProps,
    }
  ];
  
  return { columns }
}

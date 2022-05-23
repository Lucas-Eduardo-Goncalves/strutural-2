import React from "react";
import { Col } from "antd";

import { Button } from '../../../components/buttons/buttons';
import { PlusOutlined } from '@ant-design/icons';

export function ModalAddContact() {
  return (
    <Col  lg={4}  xs={24}>
      <div className="table-toolbox-actions">
        <Button size="small" type="primary" onClick={() => {}}>
          <PlusOutlined size={12} /> Adicionar
        </Button>
      </div>
    </Col>
  );
}
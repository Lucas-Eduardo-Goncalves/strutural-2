import React from "react";
import { Col, Radio } from "antd";

export function StatusRadioGroup() {
  return (
    <Col lg={14} xs={24}>
      <div className="table-toolbox-menu">
        <span className="toolbox-menu-title"> Status:</span>

        <Radio.Group onChange={() => {}} defaultValue="1">
          <Radio.Button value="0">
            Ativos
          </Radio.Button>
          <Radio.Button value="1">
            Inativos
          </Radio.Button>
        </Radio.Group>
      </div>
    </Col>
  );
}

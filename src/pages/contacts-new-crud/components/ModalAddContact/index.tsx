import React, { useState } from "react";
import { Col, Modal } from "antd";

import { Button } from '../../../../components/buttons/buttons';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from "./FormAddContact";

interface IModalAddContactComponent {
  refetch: () => void;
}

export function ModalAddContact({ refetch }: IModalAddContactComponent) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Col  lg={4}  xs={24}>
      <div className="table-toolbox-actions">
        <Button size="small" type="primary" onClick={() => setModalIsOpen(true)}>
          <PlusOutlined size={12} /> Adicionar
        </Button>
      </div>

      <Modal
        title="Adicionar Usuário"
        visible={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        confirmLoading={true}
        footer={null}
        maskClosable={false}
        width={600}
        style={{marginTop: -60}}
        bodyStyle={{padding: 0}}
      >
        <Form setModalIsOpen={setModalIsOpen} refetch={refetch} />
      </Modal>
    </Col>
  );
}
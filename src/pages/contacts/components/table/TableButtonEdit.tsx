import React, { useState } from "react";
// import { Modal } from "antd"; 
import FeatherIcon from "feather-icons-react";

import { Button } from "../../../../components/buttons/buttons";
import { Modal } from "antd";
import { Form } from "../ContactForm";
import { useFetch } from "../../../../hooks/useFetch";

interface ITableButtonEditProps {
  contactId: string;
  refetch: () => void;
}

interface IFetchProps {
  email: string;
  name: string;
  segmentId: number;
}

export function TableButtonEdit({ contactId, refetch }: ITableButtonEditProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { dataFetch } = useFetch<IFetchProps>({ 
    isArray: false, 
    baseUrl: `contacts/${contactId}`
  });

  return (
    <>
      <Button 
        className="btn-icon" 
        type="info" 
        onClick={() => setModalIsOpen(true)} 
        to="#" 
        shape="circle"
        >
        <FeatherIcon icon="edit" size={16} />
      </Button>

      <Modal
        title="Editar contato"
        visible={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        confirmLoading={true}
        footer={null}
        maskClosable={false}
        width={600}
        style={{marginTop: -60}}
        bodyStyle={{padding: 0}}
      > 
        {dataFetch && (
          <Form 
            formType="put"
            contactId={contactId}
            initialFields={{
              name: dataFetch.name,
              email: dataFetch.email,
              select: { 
                label: String(dataFetch.segmentId), 
                value: String(dataFetch.segmentId), 
              }
            }}
            setModalIsOpen={setModalIsOpen} 
            refetch={refetch} 
          />
        )}
      </Modal>
    </>
  );
}
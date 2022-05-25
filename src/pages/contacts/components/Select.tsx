import React, { useState } from "react";

import { Select, Form as AntdForm, Input, Button, Modal } from "antd";
import { useFetch } from "../../../hooks/useFetch";
import { api } from "../../../services/api";
import toast from "react-hot-toast";

interface ISegmentProps {
  createdAt: string;
  deletedAt: string | null;
  id: number;
  name: string;
  updatedAt: string;
  userId: number;
}

interface ISelectProps {
  label: string; 
  value: string;
}

interface ISelectSegmentoComponent {
  selectValue: ISelectProps;
  setSelectValue: (event: ISelectProps) => void;
}

export function SelectSegmento({ selectValue, setSelectValue }: ISelectSegmentoComponent) {
  const { dataFetch, refetch } = useFetch<ISegmentProps[]>({ baseUrl: "segments", isLinkProps: false });
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataInputModal, setDataInputModal] = useState("");
  
  async function handleNewSelect() {
    if(!dataInputModal) {
      toast.error("O campo não pode estar em branco");
      return;
    }

    const { data } = await api.post<ISegmentProps>("segments", { name: dataInputModal });

    setSelectValue({ 
      value: String(data.id), 
      label: data.name 
    })

    setModalIsOpen(false);
    refetch()
  }

  function handleSelected(event: string) {
    setSelectValue({ label: event, value: event });
  }

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <AntdForm.Item label="Segmento" style={{ width: "100%" }}>
          <Select
            showSearch
            placeholder="Selecione uma segmento"
            value={selectValue.value !== "" && Number(selectValue.value)}
            onChange={value => handleSelected(String(value))}
          > 
            {dataFetch?.map(segment => (
              <Select.Option value={segment.id}>{segment.name}</Select.Option>
            ))}
          </Select>
        </AntdForm.Item>

        <Button 
          onClick={() => setModalIsOpen(true)}
          style={{ marginTop: "2.20rem", height: "2.3rem" }}
        >
          +
        </Button>
      </div>

      <Modal
        title="Adicionar item ao select"
        visible={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        footer={null}
        maskClosable={false}
        width={500}
      >
        <AntdForm.Item label="Nome do item">
          <Input
            placeholder="nome"
            value={dataInputModal}
            onChange={e => setDataInputModal(e.target.value)}
          />
        </AntdForm.Item>

        <Button onClick={handleNewSelect}>Adicionar</Button>
      </Modal>
    </>
  );
}

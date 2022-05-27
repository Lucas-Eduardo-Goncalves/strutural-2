import React, { useState } from "react";

import { Select, Form as AntdForm, Input, Button, Modal } from "antd";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { ISelectSegmentoComponent } from "./types";

export function SelectSegmento({ 
  title, 
  postUrl = "", 
  data, 
  refetch, 
  selectValue, 
  setSelectValue,
}: ISelectSegmentoComponent) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataInputModal, setDataInputModal] = useState("");
  
  async function handleNewSelect() {
    if(!dataInputModal) {
      toast.error("O campo não pode estar em branco");
      return;
    }

    const { data } = await api.post(postUrl, { name: dataInputModal });

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
            placeholder={title}
            value={selectValue.value !== "" && selectValue.value}
            onChange={value => handleSelected(String(value))}
          > 
            {data?.map(segment => (
              <Select.Option value={segment.value}>{segment.label}</Select.Option>
            ))}
          </Select>
        </AntdForm.Item>
        
        {postUrl && (
          <Button 
            onClick={() => setModalIsOpen(true)}
            style={{ marginTop: "2.20rem", height: "2.3rem" }}
          >
            +
          </Button>
        )}
      </div>

      <Modal
        title="Adicionar item ao select"
        visible={!postUrl ? false : modalIsOpen}
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

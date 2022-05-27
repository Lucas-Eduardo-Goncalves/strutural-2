import React, { useState } from "react";

import { Select, Form as AntdForm, Input, Button, Modal } from "antd";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { ISelectSegmentoComponent, IFetchProps } from "./types";
import { useFetch } from "../../hooks/useFetch";

export function SelectSegmento({ 
  title, 
  postUrl = "", 
  fetchUrl,
  selectValue, 
  setSelectValue,
}: ISelectSegmentoComponent) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataInputModal, setDataInputModal] = useState("");

  const { dataFetch, refetch, setSearch } = useFetch<IFetchProps[]>({ baseUrl: fetchUrl });
  
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

  let timer: NodeJS.Timeout;
  
  function debounce(event: string) {
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      setSearch(event);
    }, 1000)
  }


  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <AntdForm.Item label="Segmento" style={{ width: "100%" }}>
          <Select
            showSearch
            filterOption={false}
            placeholder={title}
            onSearch={e => debounce(e)}
            value={selectValue.value !== "" && String(selectValue.value)}
            onChange={value => handleSelected(String(value))}
          > 
            {dataFetch?.map(segment => (
              <Select.Option value={String(segment.id)}>{segment.name}</Select.Option>
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

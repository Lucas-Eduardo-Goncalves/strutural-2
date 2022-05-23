import React, { useState } from "react";
import { 
  Row, 
  Col, 
  Button, 
  Input, 
  Select, 
  Form as AntdForm, 
  Modal, 
} from "antd";

import toast from "react-hot-toast";
import { CardWrapper, FormWrapper } from "../../styles";
import { api } from "../../../../services/api";

interface IFormComponent {
  setModalIsOpen: (event: boolean) => void;
  refetch: () => void;
}

export function Form ({ setModalIsOpen, refetch }: IFormComponent) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [select, setSelect] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function clearFieldsAndCloseModal() {
    setName("");
    setEmail("");
    setSelect("");
    setModalIsOpen(false);
  }

  async function handleSubmit() {
    setIsLoading(true);
    
    if(!name) {
      setIsLoading(false); 
      toast.error("Nome não pode estar em branco.");
      return;
    }
      
    if(!email) {
      setIsLoading(false); 
      toast.error("E-mail não pode estar em branco.");
      return;
    }

    if(!select) {
      setIsLoading(false); 
      toast.error("Segmento não pode estar em branco.");
      return
    } 

    try {
      await api.post("/contacts", { name, email, segmentId: select });
      setModalIsOpen(false);
    } catch(err) {
      console.log(err)
    }
    
    setIsLoading(false);
    refetch();
  }

  return (
    <FormWrapper>
      <AntdForm layout="vertical" style={{ padding: 30 }}>
        <CardWrapper type="inner" title="Informações Gerais">
        <div style={{ display: "flex", gap: "1rem" }}>
          <AntdForm.Item label="Segmento" style={{ width: "100%" }}>
            <Select
              placeholder="Selecione uma segmento"
              value={select}
              onChange={value => setSelect(value)}
            >
                <Select.Option value={"0"}>segmento1</Select.Option>
                <Select.Option value={"1"}>segmento2</Select.Option>
            </Select>
          </AntdForm.Item>

          <Button 
            onClick={() => setIsOpenModal(true)}
            style={{ marginTop: "2.20rem", height: "2.3rem" }}
          >
            +
          </Button>
        </div>

          <AntdForm.Item label="Nome">
            <Input
              placeholder="Nome Completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </AntdForm.Item>

          <AntdForm.Item label="E-mail">
            <Input
              placeholder="seuemail@gmai.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
          </AntdForm.Item>
        </CardWrapper>
      </AntdForm>

      <footer style={{padding: "20px 30px", borderTop: "1px solid #f0f0f0"}}>
        <Button type="default" onClick={clearFieldsAndCloseModal}>
          Voltar
        </Button>

        <Button type="primary" onClick={handleSubmit} loading={isLoading}>
          Salvar
        </Button>
      </footer>

      <Modal
        title="Adicionar item ao select"
        visible={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
        maskClosable={false}
        width={500}
        >
        <AntdForm.Item label="Nome do item">
          <Input
            placeholder="nome"
            // value={dataItemModal}
            // onChange={e => setDataItemModal(e.target.value)}
            />
        </AntdForm.Item>

        <Button onClick={() => {}}>Adicionar</Button>
      </Modal>
    </FormWrapper>
  );
};
import React, { useState } from "react";
import toast from "react-hot-toast";

import { Button, Input, Form as AntdForm } from "antd";
import { CardWrapper, FormWrapper } from "../../styles";
import { api } from "../../../../services/api";
import { SelectSegmento } from "../SelectSegmento";

interface IFormComponent {
  setModalIsOpen: (event: boolean) => void;
  refetch: () => void;
}

export function Form ({ setModalIsOpen, refetch }: IFormComponent) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [select, setSelect] = useState("");

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

          <SelectSegmento setSelectValue={setSelect}/>
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
    </FormWrapper>
  );
};
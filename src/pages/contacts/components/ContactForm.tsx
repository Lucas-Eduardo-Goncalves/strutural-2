import React, { useState } from "react";
import toast from "react-hot-toast";

import { Button, Input, Form as AntdForm } from "antd";
import { CardWrapper, FormWrapper } from "../styles";
import { api } from "../../../services/api";
import { SelectSegmento } from "./Select";

interface IFormInitialFields {
  name: string;
  email: string;
  select: { label: string; value: string; };
}

interface IFormComponent {
  formType: "put" | "post",
  initialFields?: IFormInitialFields;
  refetch: () => void;
  contactId?: string;
  setModalIsOpen: (event: boolean) => void;
}

export function Form({ 
  formType,
  setModalIsOpen, 
  refetch, 
  contactId,
  initialFields = { email: "", name: "", select: { label: "", value: "" } } 
}: IFormComponent) {
  const [name, setName] = useState(initialFields.name);
  const [email, setEmail] = useState(initialFields.email);

  const [select, setSelect] = useState({ 
    label: initialFields.select.label,
    value: initialFields.select.value, 
  });

  const [isLoading, setIsLoading] = useState(false);

  function clearFieldsAndCloseModal() {
    setName("");
    setEmail("");
    setSelect({ label: "", value: "" });
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
      if(formType === "post") {
        await api.post("/contacts", { name, email, segmentId: select.value });
        setModalIsOpen(false);
      } else {
        if(contactId) {
          await api.put(`contacts/${contactId}`, { name, email, segmentId: select.value });
          setModalIsOpen(false);
        }
      }
      
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

          <SelectSegmento selectValue={select} setSelectValue={setSelect} />
        </CardWrapper>
      </AntdForm>

      <footer style={{ padding: "20px 30px", borderTop: "1px solid #f0f0f0" }}>
        <Button type="default" onClick={clearFieldsAndCloseModal}>
          Voltar
        </Button>

        <Button type="primary" onClick={handleSubmit} loading={isLoading}>
          Salvar
        </Button>
      </footer>
    </FormWrapper>
  );
}

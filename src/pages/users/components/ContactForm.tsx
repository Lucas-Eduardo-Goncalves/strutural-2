import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button, Input, Form as AntdForm } from "antd";
import { CardWrapper, FormWrapper } from "../styles";
import { api } from "../../../services/api";
import { SelectSegmento } from "../../../components/Select";
import { UploadComponent } from "../../../components/UploadComponent";
import { useFetch } from "../../../hooks/useFetch";

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

interface ISegmentProps {
  createdAt: string;
  deletedAt: string | null;
  id: number;
  name: string;
  updatedAt: string;
  userId: number;
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

  const [select2, setSelect2] = useState({ 
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

    if(!select || !select2) {
      setIsLoading(false); 
      toast.error("Segmento não pode estar em branco.");
      return
    } 

    try {
      if(formType === "post") {
        await api.post("/contacts", { name, email, segmentId: select.value, tag: select2.value });
        setModalIsOpen(false);
      } else {
        if(contactId) {
          await api.put(`contacts/${contactId}`, { name, email, segmentId: select.value, tag: select2.value });
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

          <SelectSegmento
            title="Selecione um segmento"
            postUrl="segments"
            fetchUrl="segments"
            selectValue={select} 
            setSelectValue={setSelect} 
          />

          <SelectSegmento
            fetchUrl="segments"
            title="Selecione uma tag"
            postUrl="segments"
            selectValue={select2} 
            setSelectValue={setSelect2} 
          />
        </CardWrapper>
      </AntdForm>

      {formType === "post" && <UploadComponent />} 

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

import React, { useState } from 'react';
import { Row, Col, Button, Input, Select, DatePicker, Form as AntdForm, Checkbox, InputNumber, Modal } from 'antd';

import { CardWrapper, FormWrapper } from '../style';
import { IDependences, IFormData, IFormDataErrors } from '../types';
import { validate } from '../validation/form';
import { initialEmptyFormData } from '../empty-data';

type FormProps = {
  initialData?: IFormData;
  handleSubmit: (data: IFormData) => void;
  onCancel: () => void;
  loading: boolean;
  dependences: IDependences;
};

const defaultErrors = {};

const Form: React.FC<FormProps> = ({ initialData, handleSubmit, onCancel, loading, dependences }) => {
  const isUpdatingData = !!initialData;

  const [data, setData] = useState(initialData || initialEmptyFormData);
  const [formSubmited, setFormSubmited] = useState(false);
  const [errors, setErrors] = useState<IFormDataErrors>({ ...defaultErrors });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataItemModal, setDataItemModal] = useState("");


  function handleValidate(form: IFormData) {
    const validationErrors = validate(form);
    if (!validationErrors) setErrors({ ...defaultErrors });
    else setErrors(validationErrors);
    return validationErrors;
  }

  function handleChange(key: keyof IFormData, value: any) {
    setData(prev => {
     const newState = { ...prev, [key]: value };
    // const newState = { ...prev};
      handleValidate(newState);
      return newState;
    });
  }

  async function handleSubmitForm() {
    setFormSubmited(true);
    const hasErrors = handleValidate(data);
    if (!hasErrors) return handleSubmit(data);
  }

  function AddItemSelet() {
    if(dataItemModal === "") {
      alert("Não pode ser em branco")
    }

    handleChange('isActive', dataItemModal);
    setIsOpenModal(false);
  }

  function getErrorProps(key: keyof IFormData) {
    const currentError = errors[key];

    if (!formSubmited) return {};
    if (!currentError) return {};

    return {
      validateStatus: 'error' as 'error',
      help: currentError,
    };
  }

  return (
    <FormWrapper>
      <AntdForm layout="vertical" style={{padding: 30}}>
      <Row gutter={40}>
        <Col span={12}>
          <CardWrapper type="inner" title="Informações Gerais">
           <div className="divSelectButtonFlex">
              <AntdForm.Item label="Status" {...getErrorProps('isActive')}  >
                <Select
                  placeholder="Selecione uma Status"
                  value={data.isActive}
                  onChange={value => handleChange('isActive', value)}
                >
                    <Select.Option value={0}>Pendente</Select.Option>
                    <Select.Option value={1}>Ativo</Select.Option>
                </Select>
              </AntdForm.Item>
              <Button onClick={() => setIsOpenModal(true)}>+</Button>
           </div>

            <AntdForm.Item label="Nome" {...getErrorProps('name')}>
              <Input
                placeholder="Nome Completo"
                value={data.name}
                onChange={e => handleChange('name', e.target.value)}
              />
            </AntdForm.Item>

            <AntdForm.Item label="Telefone (Whatsapp)" {...getErrorProps('phone')}>
              <Input
                placeholder="Telefone (Whatsapp)"
                value={data.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </AntdForm.Item>
          </CardWrapper>
        </Col>
      </Row>
    </AntdForm>

      <footer style={{padding: '20px 30px', borderTop: '1px solid #f0f0f0'}}>
        <Button type="default" onClick={() => onCancel()}>
          Voltar
        </Button>
        <Button type="primary" onClick={handleSubmitForm} loading={loading}>
          {isUpdatingData ? 'Atualizar' : 'Salvar'}
        </Button>
      </footer>

      {isOpenModal && (
        <Modal
          title="Adicionar item ao select"
          visible
          onCancel={() => setIsOpenModal(false)}
          footer={null}
          maskClosable={false}
          width={500}
        >
         <AntdForm.Item label="Nome do item">
            <Input
              placeholder="nome"
              value={dataItemModal}
              onChange={e => setDataItemModal(e.target.value)}
            />
          </AntdForm.Item>

          <Button onClick={AddItemSelet}>Adicionar</Button>
        </Modal>
      )}
      
    </FormWrapper>
  );
};

export default Form;
